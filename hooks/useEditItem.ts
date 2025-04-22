import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";
import { ItemFormData } from "../types/item";
import { router } from "expo-router";
import { Alert } from "react-native";
import { cleanupItemImages } from "../lib/storage";

export function useEditItem(itemId: string) {
  const queryClient = useQueryClient();

  const editMutation = useMutation({
    mutationFn: async (data: ItemFormData) => {
      // Get the current item data for image comparison
      const { data: currentItem } = await supabase
        .from("items")
        .select("main_image, instructions")
        .eq("id", itemId)
        .single();

      if (!currentItem) throw new Error("Item not found");

      // Collect all old images
      interface Instruction {
        "image-url"?: string;
      }

      const oldImages = [
        currentItem.main_image,
        ...((currentItem.instructions as Instruction[]) ?? [])
          .map((instruction: Instruction) => instruction["image-url"])
          .filter((url): url is string => typeof url === "string"),
      ];

      // Collect all new images
      const newImages = [
        data.main_image,
        ...data.instructions
          .map((instruction) => instruction["image-url"])
          .filter((url): url is string => typeof url === "string"),
      ];

      // Update item data
      const { error: itemError } = await supabase
        .from("items")
        .update({
          title: data.title,
          description: data.description,
          main_image: data.main_image,
          category_id: data.category_id,
          tags: data.tags,
          ingredients: data.ingredients,
          instructions: data.instructions,
          updated_at: new Date().toISOString(),
        })
        .eq("id", itemId);

      if (itemError) throw itemError;

      // Clean up unused images
      await cleanupItemImages(oldImages, newImages);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
      queryClient.invalidateQueries({ queryKey: ["item", itemId] });
      Alert.alert("Success", "Item updated successfully!", [
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
        const images = [
          item.main_image,
          ...(item.instructions ?? [])
            .map((instruction: any) => instruction["image-url"])
            .filter(Boolean),
        ];

        // Delete the item
        const { error } = await supabase
          .from("items")
          .delete()
          .eq("id", itemId);

        if (error) throw error;

        // Clean up all images
        await cleanupItemImages(images, []);
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
