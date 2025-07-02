import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { ItemFormData } from "@/types/item";
import { router } from "expo-router";
import { Alert } from "react-native";
import { deleteStorageFile } from "@/lib/storage";

interface EditItemData extends ItemFormData {
  // Optional array of old image URLs that need to be cleaned up
  imagesToCleanup?: string[];
}

export function useEditItem(itemId: string) {
  const queryClient = useQueryClient();

  const editMutation = useMutation({
    mutationFn: async (data: EditItemData) => {
      const { imagesToCleanup, ...itemData } = data;

      // Update item data
      const { error: itemError } = await supabase
        .from("items")
        .update({
          title: itemData.title,
          description: itemData.description,
          main_image: itemData.main_image,
          category_id: itemData.category_id,
          ingredients: itemData.ingredients,
          instructions: itemData.instructions,
          updated_at: new Date().toISOString(),
        })
        .eq("id", itemId);

      if (itemError) throw itemError;

      // Clean up old images that were replaced
      // The form component determines which images need cleanup
      if (imagesToCleanup && imagesToCleanup.length > 0) {
        await Promise.all(imagesToCleanup.map((url) => deleteStorageFile(url)));
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
      queryClient.invalidateQueries({ queryKey: ["item", itemId] });
      Alert.alert("Success", "Recipe updated successfully!", [
        {
          text: "OK",
          onPress: () => router.back(),
        },
      ]);
    },
    onError: (error) => {
      Alert.alert(
        "Error",
        error instanceof Error ? error.message : "An error occurred"
      );
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      // Get all images associated with the item before deletion
      const { data: item } = await supabase
        .from("items")
        .select("main_image, instructions")
        .eq("id", itemId)
        .single();

      if (item) {
        // Delete the item first
        const { error } = await supabase
          .from("items")
          .delete()
          .eq("id", itemId);

        if (error) throw error;

        // Then clean up all images
        const images = [
          item.main_image,
          ...(item.instructions ?? [])
            .map((instruction: any) => instruction["image-url"])
            .filter(
              (url: any): url is string =>
                typeof url === "string" && url.length > 0
            ),
        ];

        await Promise.all(images.map((url) => deleteStorageFile(url)));
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
      router.replace("/");
    },
    onError: (error) => {
      Alert.alert(
        "Error",
        error instanceof Error ? error.message : "An error occurred"
      );
    },
  });

  return {
    editItem: editMutation.mutate,
    deleteItem: deleteMutation.mutate,
    isEditing: editMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}
