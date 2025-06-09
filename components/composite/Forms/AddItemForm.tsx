import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { itemFormSchema } from "@/lib/schemas";
import { ItemFormData } from "@/types/item";
import { useAddItem } from "@/hooks/useAddItem";
import { View, Text, Scroll, Button, Error } from "@/components/ui";
import {
  ItemFormField,
  ImageUploadField,
  CategorySelect,
  DynamicList,
  InstructionFormField,
} from "@/components/composite";

interface AddItemFormProps {
  userId: string;
  onSuccess: (item: { id: string }) => void;
}

export const AddItemForm: React.FC<AddItemFormProps> = ({
  userId,
  onSuccess,
}) => {
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
    control,
    name: "ingredients",
  });

  const instructionsArray = useFieldArray({
    control,
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
        console.error("Add item error:", error);
      },
    });
  };

  return (
    <Scroll variant="padded">
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

      <View style={{ marginTop: 24, marginBottom: 48 }}>
        <Button
          variant="primary"
          size="lg"
          onPress={handleSubmit(onSubmit)}
          disabled={addItemMutation.isPending}
          loading={addItemMutation.isPending}
          fullWidth
        >
          Add Recipe
        </Button>

        {addItemMutation.error && (
          <View style={{ marginTop: 8 }}>
            <Error
              variant="box"
              message={
                addItemMutation.error instanceof Error
                  ? addItemMutation.error.message
                  : "An error occurred"
              }
            />
          </View>
        )}
      </View>
    </Scroll>
  );
};
