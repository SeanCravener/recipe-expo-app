import React from "react";
import { useLocalSearchParams } from "expo-router";
import { useItem } from "@/hooks/useItem";
import { useEditItem } from "@/hooks/useEditItem";
import { View, Loading } from "@/components/ui";
import { EditItemForm } from "@/components/composite";
import { ItemFormData } from "@/types/item";

export default function EditItem() {
  const { id } = useLocalSearchParams();
  const { data: item, isLoading } = useItem(id as string);
  const { editItem, deleteItem, isEditing, isDeleting } = useEditItem(
    id as string
  );

  const handleSubmit = (data: ItemFormData) => {
    editItem(data);
  };

  const handleDelete = () => {
    deleteItem();
  };

  if (isLoading || !item) {
    return (
      <View variant="centered" style={{ flex: 1 }}>
        <Loading variant="spinner" />
      </View>
    );
  }

  // Transform the item data to match ItemFormData structure
  const initialValues: ItemFormData = {
    ...item,
    ingredients: (item.ingredients || []).map((ingredient) =>
      typeof ingredient === "string" ? { value: ingredient } : ingredient
    ),
  };

  return (
    <EditItemForm
      initialValues={initialValues}
      onSubmit={handleSubmit}
      onDelete={handleDelete}
      isSaving={isEditing}
      isDeleting={isDeleting}
    />
  );
}
