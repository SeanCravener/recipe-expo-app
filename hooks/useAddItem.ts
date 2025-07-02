import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { ItemFormData } from "@/types/item";

export function useAddItem(sessionUserId: string | undefined) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ItemFormData) => {
      if (!sessionUserId) throw new Error("Must be logged in to add items");

      // At this point, all images should already be uploaded
      // The form handles the upload process before calling this mutation

      const { data: item, error } = await supabase
        .from("items")
        .insert({
          ...data,
          user_id: sessionUserId,
        })
        .select()
        .single();

      if (error) {
        // Don't try to cleanup images here - the form component
        // should handle cleanup if needed since it manages the upload process
        throw error;
      }

      // Invalidate item lists for immediate UI update
      await queryClient.invalidateQueries({ queryKey: ["items"] });

      return item;
    },
  });
}
