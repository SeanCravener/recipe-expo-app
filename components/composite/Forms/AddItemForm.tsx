import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { itemFormSchema } from "@/lib/schemas";
import { ItemFormData } from "@/types/item";
import { useAddItem } from "@/hooks/useAddItem";
import { useTheme } from "@/theme/hooks/useTheme";
import { View, Scroll, Button, Error, Text } from "@/components/ui";
import {
  FormSection,
  ItemFormField,
  ImageUploadField,
  CategorySelect,
  IngredientsList,
  InstructionsList,
} from "@/components/composite";

interface AddItemFormProps {
  userId: string;
  onSuccess: (item: { id: string }) => void;
}

export const AddItemForm: React.FC<AddItemFormProps> = ({
  userId,
  onSuccess,
}) => {
  const { control, handleSubmit, setValue, watch, reset, formState } =
    useForm<ItemFormData>({
      resolver: zodResolver(itemFormSchema),
      defaultValues: {
        title: "",
        description: "",
        main_image: "",
        category_id: null,
        ingredients: [],
        instructions: [],
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
  const { theme } = useTheme();

  // Watch for form data to show progress
  const watchedData = watch();
  const hasTitle = watchedData.title?.length > 0;
  const hasImage = watchedData.main_image?.length > 0;
  const hasIngredients = watchedData.ingredients?.length > 0;
  const hasInstructions = watchedData.instructions?.some(
    (inst) => inst.content?.length > 0
  );

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

  const isFormDisabled = addItemMutation.isPending;

  return (
    <Scroll
      variant="flush"
      style={{ flex: 1 }}
      contentContainerStyle={{
        padding: 16,
        paddingBottom: 100, // Extra space for bottom button
      }}
      showsVerticalScrollIndicator={false}
    >
      {/* Main Image Section */}
      <FormSection style={{ marginBottom: 16 }}>
        <ImageUploadField
          label="Recipe Photo"
          value={watch("main_image")}
          onChange={(url) => setValue("main_image", url)}
          bucket="item-images"
          disabled={isFormDisabled}
          required
          helpText="Add an appetizing photo of your finished recipe"
          height={240}
          placeholder="Add Recipe Photo"
        />
      </FormSection>

      {/* Recipe Details Section */}
      <FormSection title="Recipe Details" style={{ marginBottom: 16 }}>
        <ItemFormField
          control={control}
          name="title"
          label="Recipe Title"
          placeholder="Enter the title of your new recipe"
          disabled={isFormDisabled}
          required
          helpText="Give your recipe a descriptive and appetizing name"
        />

        <ItemFormField
          control={control}
          name="description"
          label="Description"
          placeholder="Describe your recipe..."
          multiline
          disabled={isFormDisabled}
          helpText="Tell people what makes this recipe special"
        />

        <View style={{ marginTop: 8 }}>
          <CategorySelect
            control={control}
            disabled={isFormDisabled}
            required
            helpText="Choose the category that best describes your recipe"
          />
        </View>
      </FormSection>

      {/* Ingredients Section */}
      <FormSection
        title="Ingredients"
        subtitle={`${ingredientsArray.fields.length}/20 ingredients`}
        style={{ marginBottom: 16 }}
      >
        <IngredientsList
          ingredients={ingredientsArray.fields}
          onAdd={(value) => ingredientsArray.append({ value })}
          onEdit={(index, value) => ingredientsArray.update(index, { value })}
          onDelete={(index) => ingredientsArray.remove(index)}
          disabled={isFormDisabled}
          maxItems={20}
        />
      </FormSection>

      {/* Instructions Section */}
      <FormSection
        title="Steps"
        subtitle={`${instructionsArray.fields.length}/15 steps`}
        style={{ marginBottom: 24 }}
      >
        <InstructionsList
          instructions={instructionsArray.fields}
          onAdd={(instruction) => instructionsArray.append(instruction)}
          onEdit={(index, instruction) =>
            instructionsArray.update(index, instruction)
          }
          onDelete={(index) => instructionsArray.remove(index)}
          disabled={isFormDisabled}
          maxItems={15}
        />
      </FormSection>

      {/* Action Buttons */}
      <View
        variant="row"
        style={{
          gap: 12,
          marginTop: 8,
          marginBottom: 16,
        }}
      >
        <Button
          variant="outline"
          size="lg"
          onPress={() => reset()}
          disabled={isFormDisabled}
          style={{ flex: 1 }}
        >
          Clear
        </Button>

        <Button
          variant="primary"
          size="lg"
          onPress={handleSubmit(onSubmit)}
          disabled={isFormDisabled || !formState.isValid}
          loading={addItemMutation.isPending}
          style={{ flex: 1 }}
        >
          {addItemMutation.isPending ? "Publishing..." : "Publish"}
        </Button>
      </View>

      {/* Error Display */}
      {addItemMutation.error && (
        <View style={{ marginTop: 8 }}>
          <Error
            variant="box"
            message={
              addItemMutation.error instanceof Error
                ? addItemMutation.error.message
                : "Failed to add recipe. Please try again."
            }
          />
        </View>
      )}

      {/* Form Progress Indicator (Optional) */}
      {!addItemMutation.isPending && (
        <View
          style={{
            marginTop: 16,
            padding: 12,
            backgroundColor: theme.colors.surfaceVariant,
            borderRadius: theme.borderRadius.md,
          }}
        >
          <Text
            variant="bodySmallMedium"
            color="onSurfaceVariant"
            style={{ marginBottom: 8 }}
          >
            Progress
          </Text>
          <View variant="row" style={{ flexWrap: "wrap", gap: 8 }}>
            {hasTitle && (
              <View
                style={{
                  backgroundColor: theme.colors.primary,
                  paddingHorizontal: theme.spacing.sm,
                  paddingVertical: theme.spacing.xs,
                  borderRadius: theme.borderRadius.full,
                }}
              >
                <Text variant="bodyXSmallRegular" color="onPrimary">
                  ✓ Title
                </Text>
              </View>
            )}
            {hasImage && (
              <View
                style={{
                  backgroundColor: theme.colors.primary,
                  paddingHorizontal: theme.spacing.sm,
                  paddingVertical: theme.spacing.xs,
                  borderRadius: theme.borderRadius.full,
                }}
              >
                <Text variant="bodyXSmallRegular" color="onPrimary">
                  ✓ Photo
                </Text>
              </View>
            )}
            {hasIngredients && (
              <View
                style={{
                  backgroundColor: theme.colors.primary,
                  paddingHorizontal: theme.spacing.sm,
                  paddingVertical: theme.spacing.xs,
                  borderRadius: theme.borderRadius.full,
                }}
              >
                <Text variant="bodyXSmallRegular" color="onPrimary">
                  ✓ Ingredients
                </Text>
              </View>
            )}
            {hasInstructions && (
              <View
                style={{
                  backgroundColor: theme.colors.primary,
                  paddingHorizontal: theme.spacing.sm,
                  paddingVertical: theme.spacing.xs,
                  borderRadius: theme.borderRadius.full,
                }}
              >
                <Text variant="bodyXSmallRegular" color="onPrimary">
                  ✓ Steps
                </Text>
              </View>
            )}
          </View>
        </View>
      )}
    </Scroll>
  );
};
