import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";
import { AddItemSchema } from "../lib/schemas";
import { router } from "expo-router";
import { Alert } from "react-native";
import { cleanupItemImages } from "../lib/storage";
import { Item } from "../types/item";

export function useEditItem(itemId: string) {
  const queryClient = useQueryClient();

  const editMutation = useMutation({
    mutationFn: async (data: AddItemSchema) => {
      // Get the current item data for image comparison
      const { data: currentItem } = await supabase
        .from("items")
        .select(
          `
          main_image,
          instructions(image_url)
        `
        )
        .eq("id", itemId)
        .single();

      if (!currentItem) throw new Error("Item not found");

      // Collect all old images
      const oldImages = [
        currentItem.main_image,
        ...currentItem.instructions
          .map((instruction: any) => instruction.image_url)
          .filter(Boolean),
      ];

      // Collect all new images
      const newImages = [
        data.main_image,
        ...data.instructions
          .map((instruction) => instruction.image_url)
          .filter(Boolean),
      ];

      // Update main item data
      const { error: itemError } = await supabase
        .from("items")
        .update({
          title: data.title,
          description: data.description,
          main_image: data.main_image,
          updated_at: new Date().toISOString(),
        })
        .eq("id", itemId);

      if (itemError) throw itemError;

      // Delete existing relations
      await Promise.all([
        supabase.from("item_categories").delete().eq("item_id", itemId),
        supabase.from("item_tags").delete().eq("item_id", itemId),
        supabase.from("item_ingredients").delete().eq("item_id", itemId),
        supabase.from("item_instructions").delete().eq("item_id", itemId),
      ]);

      // Insert new relations
      await Promise.all([
        supabase.from("item_categories").insert(
          data.categories.filter(Boolean).map((category) => ({
            item_id: itemId,
            category,
          }))
        ),
        supabase.from("item_tags").insert(
          data.tags.filter(Boolean).map((tag) => ({
            item_id: itemId,
            tag,
          }))
        ),
        supabase.from("item_ingredients").insert(
          data.ingredients.filter(Boolean).map((ingredient, index) => ({
            item_id: itemId,
            ingredient,
            position: index,
          }))
        ),
        supabase.from("item_instructions").insert(
          data.instructions.map((instruction, index) => ({
            item_id: itemId,
            instruction: instruction.instruction,
            image_url: instruction.image_url,
            step_number: index + 1,
          }))
        ),
      ]);

      // Clean up unused images
      await cleanupItemImages(oldImages, newImages);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["item", itemId] });
      Alert.alert("Success", "Recipe updated successfully!", [
        {
          text: "OK",
          onPress: () => router.back(),
        },
      ]);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      // Get all images associated with the item before deletion
      const { data: item } = await supabase
        .from("items")
        .select(
          `
          main_image,
          instructions(image_url)
        `
        )
        .eq("id", itemId)
        .single();

      if (item) {
        const images = [
          item.main_image,
          ...item.instructions
            .map((instruction: any) => instruction.image_url)
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
  });

  return {
    editItem: editMutation.mutate,
    deleteItem: deleteMutation.mutate,
    isEditing: editMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}
