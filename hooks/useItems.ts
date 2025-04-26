import { useInfiniteQuery } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";
import { ItemSummary } from "../types/item";

const ITEMS_PER_PAGE = 10;

interface PageResult {
  items: ItemSummary[];
  nextPage: number | undefined;
}

export function useItems(searchQuery?: string) {
  const query = useInfiniteQuery<
    PageResult,
    Error,
    { pages: PageResult[] },
    [string, string?],
    number
  >({
    queryKey: ["items", searchQuery],
    queryFn: async ({ pageParam = 0 }) => {
      const from = pageParam * ITEMS_PER_PAGE;
      const to = from + ITEMS_PER_PAGE - 1;

      let dbQuery = supabase.from("items").select(`
          id,
          title,
          main_image,
          average_rating,
          category_id,
          category:item_categories!inner(
            category
          )
        `);

      if (searchQuery) {
        dbQuery = dbQuery
          .or(
            `
            title.ilike.%${searchQuery}%,
            description.ilike.%${searchQuery}%,
            tags.cs.{${searchQuery}}
          `
          )
          .order("title");
      } else {
        dbQuery = dbQuery.order("created_at", { ascending: false });
      }

      const { data, error } = await dbQuery.range(from, to);

      if (error) throw error;

      return {
        items: data.map((item) => ({
          id: item.id,
          title: item.title,
          main_image: item.main_image,
          average_rating: item.average_rating,
          category_id: item.category_id,
          category: item.category.category, // Need to figure out type error, but this works for now.
        })),
        nextPage: data.length === ITEMS_PER_PAGE ? pageParam + 1 : undefined,
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
