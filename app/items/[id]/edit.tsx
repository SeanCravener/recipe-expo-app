import React from "react";
import { useLocalSearchParams } from "expo-router";
import { useItem } from "@/hooks/useItem";
import { useEditItem } from "@/hooks/useEditItem";
import { Loading } from "@/components/ui";
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
    return <Loading fullScreen />;
  }

  return (
    <EditItemForm
      initialValues={item as ItemFormData}
      onSubmit={handleSubmit}
      onDelete={handleDelete}
      isSaving={isEditing}
      isDeleting={isDeleting}
    />
  );
}
