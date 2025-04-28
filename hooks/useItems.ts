import { useInfiniteQuery } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";
import { ItemSummary } from "../types/item";

const ITEMS_PER_PAGE = 10;

interface PageResult {
  items: ItemSummary[];
  nextPage: number | undefined;
}

type ItemFetchMode = "general" | "search" | "created" | "favorited";

export function useItems(
  mode: ItemFetchMode = "general",
  searchQuery?: string
) {
  // Get current user ID for 'created' and 'favorited' modes
  const getUserId = async () => {
    if (mode === "created" || mode === "favorited") {
      const { data } = await supabase.auth.getSession();
      return data?.session?.user?.id;
    }
    return undefined;
  };

  const query = useInfiniteQuery<
    PageResult,
    Error,
    { pages: PageResult[] },
    [string, ItemFetchMode, string?],
    number
  >({
    queryKey: ["items", mode, searchQuery],
    queryFn: async ({ pageParam = 0 }) => {
      const from = pageParam * ITEMS_PER_PAGE;
      const to = from + ITEMS_PER_PAGE - 1;

      let itemsData: any[] = [];
      let error: any = null;

      if (mode === "favorited") {
        const userId = await getUserId();
        if (userId) {
          // Separate query for user_favorites to avoid type conflict
          const { data, error: favError } = await supabase
            .from("user_favorites")
            .select(
              `
              item:items!inner(
                id,
                title,
                main_image,
                average_rating,
                category_id,
                category:item_categories!left(
                  category
                )
              ),
              created_at
              `
            )
            .eq("user_id", userId)
            .order("created_at", { ascending: false }) // Order by user_favorites.created_at directly
            .range(from, to);

          if (favError) {
            error = favError;
          } else {
            itemsData = data || [];
          }
        } else {
          return { items: [], nextPage: undefined };
        }
      } else {
        // Base Supabase query for other modes (items table directly)
        let dbQuery = supabase.from("items").select(`
          id,
          title,
          main_image,
          average_rating,
          category_id,
          category:item_categories!left(
            category
          )
        `);

        if (mode === "search" && searchQuery) {
          dbQuery = dbQuery
            .or(
              `
              title.ilike.%${searchQuery}%,
              description.ilike.%${searchQuery}%,
              `
            )
            .order("title", { ascending: true });
        } else if (mode === "created") {
          const userId = await getUserId();
          if (userId) {
            dbQuery = dbQuery
              .eq("user_id", userId)
              .order("created_at", { ascending: false });
          } else {
            return { items: [], nextPage: undefined };
          }
        } else {
          // Default 'general' mode for Home screen
          dbQuery = dbQuery.order("created_at", { ascending: false });
        }

        const { data, error: queryError } = await dbQuery.range(from, to);
        if (queryError) {
          error = queryError;
        } else {
          itemsData = data || [];
        }
      }

      if (error) throw error;

      // Handle data structure differences for 'favorited' mode
      const items =
        mode === "favorited"
          ? itemsData.map((fav: any) => ({
              id: fav.item.id,
              title: fav.item.title,
              main_image: fav.item.main_image,
              average_rating: fav.item.average_rating,
              category_id: fav.item.category_id,
              category: fav.item.category?.category || "Uncategorized",
            }))
          : itemsData.map((item: any) => ({
              id: item.id,
              title: item.title,
              main_image: item.main_image,
              average_rating: item.average_rating,
              category_id: item.category_id,
              category: item.category?.category || "Uncategorized",
            }));

      return {
        items,
        nextPage:
          itemsData.length === ITEMS_PER_PAGE ? pageParam + 1 : undefined,
      };
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  return {
    data: query.data?.pages.flatMap((page) => page.items) ?? [],
    isLoading: query.isLoading,
    isFetchingNextPage: query.isFetchingNextPage,
    hasNextPage: query.hasNextPage,
    fetchNextPage: query.fetchNextPage,
  };
}
