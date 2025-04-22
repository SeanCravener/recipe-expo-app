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
          categories:item_categories(category),
          tags:item_tags(tag),
          ingredients:item_ingredients(ingredient),
          instructions:item_instructions(step_number, instruction, image_url)
        `
        )
        .eq("id", id)
        .single();

      if (error) throw error;

      return {
        ...data,
        categories: data.categories.map((c: any) => c.category),
        tags: data.tags.map((t: any) => t.tag),
        ingredients: data.ingredients
          .sort((a: any, b: any) => a.position - b.position)
          .map((i: any) => i.ingredient),
        instructions: data.instructions.sort(
          (a: any, b: any) => a.step_number - b.step_number
        ),
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
