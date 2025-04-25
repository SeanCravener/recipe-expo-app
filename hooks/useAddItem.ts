import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";
import { ItemFormData } from "../types/item";
import { cleanupItemImages } from "../lib/storage";

export function useAddItem(sessionUserId: string | undefined) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ItemFormData) => {
      if (!sessionUserId) throw new Error("Must be logged in to add items");

      // Gather all step and main recipe images actually provided
      const allImages: string[] = [
        data.main_image,
        ...data.instructions
          .map((step) => step["image-url"])
          .filter(
            (url): url is string => typeof url === "string" && url.length > 0
          ),
      ];

      const { data: item, error } = await supabase
        .from("items")
        .insert({
          ...data,
          user_id: sessionUserId,
        })
        .select()
        .single();

      if (error) {
        // On error, clean up uploaded images
        await cleanupItemImages(allImages, []); // Remove all images uploaded in this form
        throw error;
      }

      // Invalidate item lists for immediate UI update
      await queryClient.invalidateQueries({ queryKey: ["items"] });

      return item;
    },
  });
}
