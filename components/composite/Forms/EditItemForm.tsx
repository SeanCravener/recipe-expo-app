import React, { useEffect } from "react";
import { Alert } from "react-native";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { itemFormSchema } from "@/lib/schemas";
import { ItemFormData } from "@/types/item";
import { View, Scroll, Button, Error } from "@/components/ui";
import {
  ItemFormField,
  ImageUploadField,
  CategorySelect,
  DynamicList,
  InstructionFormField,
} from "@/components/composite";

interface EditItemFormProps {
  initialValues: ItemFormData;
  onSubmit: (data: ItemFormData) => void;
  onDelete: () => void;
  isSaving: boolean;
  isDeleting: boolean;
  error?: Error | null;
}

export const EditItemForm: React.FC<EditItemFormProps> = ({
  initialValues,
  onSubmit,
  onDelete,
  isSaving,
  isDeleting,
  error,
}) => {
  const form = useForm<ItemFormData>({
    resolver: zodResolver(itemFormSchema),
    defaultValues: initialValues,
  });

  const { control, handleSubmit, setValue, watch, reset } = form;

  const ingredientsArray = useFieldArray({
    control,
    name: "ingredients",
  });

  const instructionsArray = useFieldArray({
    control,
    name: "instructions",
  });

  useEffect(() => {
    reset(initialValues);
  }, [initialValues, reset]);

  const handleDeleteConfirm = () => {
    Alert.alert(
      "Delete Item",
      "Are you sure you want to delete this item? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: onDelete },
      ]
    );
  };

  return (
    <Scroll variant="padded">
      <ItemFormField
        control={control}
        name="title"
        label="Title"
        placeholder="Enter title"
      />

      <ItemFormField
        control={control}
        name="description"
        label="Description"
        placeholder="Enter description"
        multiline
      />

      <ImageUploadField
        label="Main Image"
        value={watch("main_image")}
        onChange={(url) => setValue("main_image", url)}
      />

      <CategorySelect control={control} />

      {/* Ingredients Dynamic List */}
      <DynamicList
        control={control}
        name="ingredients"
        label="Ingredients"
        fields={ingredientsArray.fields}
        append={() => ingredientsArray.append({ value: "" })}
        remove={ingredientsArray.remove}
        max={20}
        placeholder="Enter ingredient"
      />

      {/* Instructions Dynamic List */}
      <DynamicList
        control={control}
        name="instructions"
        label="Instructions"
        fields={instructionsArray.fields}
        append={() =>
          instructionsArray.append({ content: "", "image-url": "" })
        }
        remove={instructionsArray.remove}
        max={15}
        customFieldComponent={InstructionFormField}
        customFieldProps={{
          setValue,
          watch,
        }}
      />

      {/* Error Display */}
      {error && (
        <View style={{ marginTop: 16 }}>
          <Error variant="box" message={error.message || "An error occurred"} />
        </View>
      )}

      {/* Action Buttons */}
      <View
        variant="row"
        style={{
          gap: 12,
          marginTop: 24,
          marginBottom: 40,
        }}
      >
        <Button
          variant="danger"
          size="lg"
          onPress={handleDeleteConfirm}
          disabled={isDeleting || isSaving}
          loading={isDeleting}
          style={{ flex: 1 }}
        >
          {isDeleting ? "Deleting..." : "Delete Item"}
        </Button>

        <Button
          variant="primary"
          size="lg"
          onPress={handleSubmit(onSubmit)}
          disabled={isDeleting || isSaving}
          loading={isSaving}
          style={{ flex: 1 }}
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </View>
    </Scroll>
  );
};
