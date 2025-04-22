import { useInfiniteQuery } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";
import { ItemSummary } from "../types/item";

const ITEMS_PER_PAGE = 10;

export function useItems(searchQuery?: string) {
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["items", searchQuery],
    queryFn: async ({ pageParam = 0 }) => {
      const from = pageParam * ITEMS_PER_PAGE;
      const to = from + ITEMS_PER_PAGE - 1;

      let query = supabase.from("items").select(`
          id,
          title,
          main_image,
          average_rating,
          categories:item_categories(category)
        `);

      if (searchQuery) {
        query = query
          .or(
            `
            title.ilike.%${searchQuery}%,
            description.ilike.%${searchQuery}%,
            item_tags.tag.ilike.%${searchQuery}%
          `
          )
          .order("title", { ascending: true });
      } else {
        query = query.order("created_at", { ascending: false });
      }

      const { data, error } = await query.range(from, to);

      if (error) throw error;

      return {
        items: data.map((item) => ({
          ...item,
          categories: item.categories.map((c: any) => c.category),
        })),
        nextPage: data.length === ITEMS_PER_PAGE ? pageParam + 1 : undefined,
      };
    },
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  const items = data?.pages.flatMap((page) => page.items) ?? [];

  return {
    items,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  };
}
