import React, { useEffect } from "react";
import { Alert } from "react-native";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { itemFormSchema } from "@/lib/schemas";
import { ItemFormData } from "@/types/item";
import { useTheme } from "@/hooks/useTheme";
import { View, Scroll, Text, Button } from "@/components/ui";
import {
  ItemFormField,
  ImageUploadField,
  CategorySelect,
} from "@/components/composite";

interface EditItemFormProps {
  initialValues: ItemFormData;
  onSubmit: (data: ItemFormData) => void;
  onDelete: () => void;
  isSaving: boolean;
  isDeleting: boolean;
}

export const EditItemForm: React.FC<EditItemFormProps> = ({
  initialValues,
  onSubmit,
  onDelete,
  isSaving,
  isDeleting,
}) => {
  const { theme } = useTheme();

  const form = useForm<ItemFormData>({
    resolver: zodResolver(itemFormSchema),
    defaultValues: initialValues,
  });

  const { control, handleSubmit, setValue, watch, reset } = form;

  const ingredientsArray = useFieldArray({
    control: control as any,
    name: "ingredients",
  });

  const instructionsArray = useFieldArray({
    control: control as any,
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
    <Scroll padding="lg">
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

      <View margin="lg">
        <Text variant="title" fontWeight="bold" style={{ marginBottom: 12 }}>
          Ingredients
        </Text>
        {ingredientsArray.fields.map((field, index) => (
          <View
            key={field.id}
            style={{ flexDirection: "row", marginBottom: 12 }}
          >
            <View style={{ flex: 1, marginRight: 8 }}>
              <ItemFormField
                control={control}
                name={`ingredients.${index}` as const}
                label=""
                placeholder="Enter ingredient"
              />
            </View>
            <Button
              title="Remove"
              color="primary"
              variant="text"
              size="sm"
              onPress={() => ingredientsArray.remove(index)}
            />
          </View>
        ))}
        <View style={{ alignItems: "flex-start", marginTop: theme.spacing.sm }}>
          <Button
            title="Add Ingredient"
            onPress={() => ingredientsArray.append("")}
            size="md"
            variant="outlined"
            color="primary"
          />
        </View>
      </View>

      <View margin="lg">
        <Text variant="title" fontWeight="bold" style={{ marginBottom: 12 }}>
          Instructions
        </Text>
        {instructionsArray.fields.map((field, index) => (
          <View
            key={field.id}
            backgroundColor="surfaceContainerLowest"
            padding="md"
            borderRadius="md"
            style={{ marginBottom: 16 }}
          >
            <Text
              variant="label"
              fontWeight="medium"
              style={{ marginBottom: 8 }}
            >
              Step {index + 1}
            </Text>
            <ItemFormField
              control={control}
              name={`instructions.${index}.content` as const}
              label=""
              placeholder="Enter instruction"
              multiline
            />
            <ImageUploadField
              label="Step Image (Optional)"
              value={watch(`instructions.${index}.image-url` as const)}
              onChange={(url) =>
                setValue(`instructions.${index}.image-url` as const, url)
              }
            />
            <View
              style={{ alignItems: "flex-end", marginTop: theme.spacing.sm }}
            >
              <Button
                title="Remove Step"
                onPress={() => instructionsArray.remove(index)}
                size="sm"
                variant="outlined"
                color="secondary"
              />
            </View>
          </View>
        ))}
        <View style={{ alignItems: "flex-start", marginTop: theme.spacing.sm }}>
          <Button
            title="Add Step"
            onPress={() =>
              instructionsArray.append({ content: "", "image-url": "" })
            }
            size="md"
            variant="outlined"
            color="primary"
          />
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          gap: 12,
          marginTop: 24,
          marginBottom: 40,
        }}
      >
        <Button
          title={isDeleting ? "Deleting..." : "Delete Item"}
          onPress={handleDeleteConfirm}
          color="secondary"
          disabled={isDeleting || isSaving}
          style={{ flex: 1 }}
        />
        <Button
          title={isSaving ? "Saving..." : "Save Changes"}
          onPress={handleSubmit(onSubmit)}
          color="primary"
          disabled={isDeleting || isSaving}
          style={{ flex: 1 }}
        />
      </View>
    </Scroll>
  );
};
