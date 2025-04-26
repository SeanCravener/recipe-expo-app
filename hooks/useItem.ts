import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";
import { Item } from "../types/item";
import { useAuth } from "../contexts/auth/AuthContext";

export function useItem(id: string) {
  const queryClient = useQueryClient();
  const { session } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ["item", id],
    queryFn: async (): Promise<Item> => {
      const { data, error } = await supabase
        .from("items")
        .select(
          `
          *,
          category:item_categories!inner(
            category
          )        `
        )
        .eq("id", id)
        .single();

      if (error) throw error;
      console.log("item data category", data.category.category);
      return {
        ...data,
        instructions: data.instructions as Item["instructions"],
        category: data.category.category,
      };
    },
  });

  const ratingMutation = useMutation({
    mutationFn: async (rating: number) => {
      if (!session) throw new Error("Must be logged in to rate");

      const { error } = await supabase.from("item_ratings").upsert({
        item_id: id,
        user_id: session.user.id,
        rating,
      });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["item", id] });
    },
  });

  return {
    data,
    isLoading,
    submitRating: ratingMutation.mutate,
    isSubmittingRating: ratingMutation.isPending,
  };
}
