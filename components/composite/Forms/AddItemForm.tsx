// Need to rewrite so that api hook logic is separated from the component logic. i.e. do it in screen.
// Need to go over ingrendient and instruction field array declarations.
import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { itemFormSchema } from "@/lib/schemas";
import { ItemFormData } from "@/types/item";
import { useAddItem } from "@/hooks/useAddItem";
import { useTheme } from "@/hooks/useTheme";
import { View, Text, Scroll, Button } from "@/components/ui";
import {
  ItemFormField,
  ImageUploadField,
  CategorySelect,
} from "@/components/composite";

interface AddItemFormProps {
  userId: string;
  onSuccess: (item: { id: string }) => void;
}

export const AddItemForm: React.FC<AddItemFormProps> = ({
  userId,
  onSuccess,
}) => {
  const { theme } = useTheme();

  const { control, handleSubmit, setValue, watch, reset } =
    useForm<ItemFormData>({
      resolver: zodResolver(itemFormSchema),
      defaultValues: {
        title: "",
        description: "",
        main_image: "",
        category_id: null,
        ingredients: [],
        instructions: [{ content: "", "image-url": "" }],
      },
    });

  const ingredientsArray = useFieldArray({
    control: control as any,
    name: "ingredients",
  });

  const instructionsArray = useFieldArray({
    control: control as any,
    name: "instructions",
  });

  const addItemMutation = useAddItem(userId);

  const onSubmit = (data: ItemFormData) => {
    addItemMutation.mutate(data, {
      onSuccess: (item) => {
        reset();
        onSuccess(item);
      },
      onError: (error) => {
        alert(error instanceof Error ? error.message : "An error occurred");
      },
    });
  };

  return (
    <Scroll padding="lg">
      <ItemFormField
        control={control}
        name="title"
        label="Title"
        placeholder="Enter recipe title"
      />

      <ItemFormField
        control={control}
        name="description"
        label="Description"
        placeholder="Enter recipe description"
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
        style={{ marginTop: theme.spacing.lg, marginBottom: theme.spacing.xxl }}
      >
        <Button
          title={addItemMutation.isPending ? "Adding..." : "Add Recipe"}
          onPress={handleSubmit(onSubmit)}
          disabled={addItemMutation.isPending}
          size="lg"
          color="tertiary"
          elevation="level2"
        />
      </View>
    </Scroll>
  );
};
