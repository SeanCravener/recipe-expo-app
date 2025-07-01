import React, { useEffect } from "react";
import { Alert } from "react-native";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { itemFormSchema } from "@/lib/schemas";
import { ItemFormData } from "@/types/item";
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
  const { theme } = useTheme();
  const { control, handleSubmit, setValue, watch, reset, formState } =
    useForm<ItemFormData>({
      resolver: zodResolver(itemFormSchema),
      defaultValues: initialValues,
    });

  const ingredientsArray = useFieldArray({
    control,
    name: "ingredients",
  });

  const instructionsArray = useFieldArray({
    control,
    name: "instructions",
  });

  // Reset form when initial values change
  useEffect(() => {
    reset(initialValues);
  }, [initialValues, reset]);

  // Watch for form data to show changes indicator
  const watchedData = watch();
  const hasChanges = React.useMemo(() => {
    return JSON.stringify(watchedData) !== JSON.stringify(initialValues);
  }, [watchedData, initialValues]);

  const handleDeleteConfirm = () => {
    Alert.alert(
      "Delete Recipe",
      "Are you sure you want to delete this recipe? This action cannot be undone and will permanently remove the recipe and all its data.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: onDelete,
        },
      ],
      { cancelable: true }
    );
  };

  const handleDiscardChanges = () => {
    if (hasChanges) {
      Alert.alert(
        "Discard Changes",
        "Are you sure you want to discard your changes? All unsaved modifications will be lost.",
        [
          { text: "Keep Editing", style: "cancel" },
          {
            text: "Discard",
            style: "destructive",
            onPress: () => reset(initialValues),
          },
        ]
      );
    }
  };

  const isFormDisabled = isSaving || isDeleting;

  return (
    <Scroll
      variant="flush"
      style={{ flex: 1 }}
      contentContainerStyle={{
        padding: 16,
        paddingBottom: 120, // Extra space for bottom buttons
      }}
      showsVerticalScrollIndicator={false}
    >
      {/* Changes Indicator */}
      {hasChanges && !isFormDisabled && (
        <View
          style={{
            backgroundColor: theme.colors.primaryContainer,
            padding: theme.spacing.md,
            borderRadius: theme.borderRadius.md,
            marginBottom: theme.spacing.md,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flex: 1 }}>
            <Text variant="bodySmallMedium" color="onPrimaryContainer">
              You have unsaved changes
            </Text>
            <Text
              variant="bodyXSmallRegular"
              color="onPrimaryContainer"
              style={{ opacity: 0.8 }}
            >
              Don't forget to save your modifications
            </Text>
          </View>
          <Button
            variant="outline"
            size="sm"
            onPress={handleDiscardChanges}
            style={{
              borderColor: theme.colors.onPrimaryContainer,
              minWidth: 80,
            }}
          >
            <Text variant="bodySmallMedium" color="onPrimaryContainer">
              Discard
            </Text>
          </Button>
        </View>
      )}

      {/* Main Image Section */}
      <FormSection style={{ marginBottom: 16 }}>
        <ImageUploadField
          label="Recipe Photo"
          value={watch("main_image")}
          onChange={(url) => setValue("main_image", url)}
          bucket="item-images"
          disabled={isFormDisabled}
          required
          helpText="Update your recipe photo"
          height={240}
          placeholder="Change Recipe Photo"
        />
      </FormSection>

      {/* Recipe Details Section */}
      <FormSection title="Recipe Details" style={{ marginBottom: 16 }}>
        <ItemFormField
          control={control}
          name="title"
          label="Recipe Title"
          placeholder="Enter recipe title"
          disabled={isFormDisabled}
          required
          helpText="Update your recipe name"
        />

        <ItemFormField
          control={control}
          name="description"
          label="Description"
          placeholder="Describe your recipe..."
          multiline
          disabled={isFormDisabled}
          helpText="Modify your recipe description"
        />

        <View style={{ marginTop: 8 }}>
          <CategorySelect
            control={control}
            disabled={isFormDisabled}
            required
            helpText="Update the category that best describes your recipe"
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

      {/* Error Display */}
      {error && (
        <View style={{ marginBottom: 16 }}>
          <Error
            variant="box"
            message={
              error.message || "An error occurred while processing your request"
            }
          />
        </View>
      )}

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
          variant="danger"
          size="lg"
          onPress={handleDeleteConfirm}
          disabled={isFormDisabled}
          loading={isDeleting}
          style={{ flex: 1 }}
        >
          {isDeleting ? "Deleting..." : "Delete Recipe"}
        </Button>

        <Button
          variant="primary"
          size="lg"
          onPress={handleSubmit(onSubmit)}
          disabled={isFormDisabled || (!hasChanges && formState.isValid)}
          loading={isSaving}
          style={{ flex: 1 }}
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </View>

      {/* Form Status Indicator */}
      {!isFormDisabled && (
        <View
          style={{
            marginTop: 8,
            padding: theme.spacing.md,
            backgroundColor: theme.colors.surfaceVariant,
            borderRadius: theme.borderRadius.md,
          }}
        >
          <View
            variant="row"
            style={{ justifyContent: "space-between", alignItems: "center" }}
          >
            <View>
              <Text variant="bodySmallMedium" color="onSurfaceVariant">
                Form Status
              </Text>
              <Text variant="bodyXSmallRegular" color="onSurfaceVariant">
                {hasChanges
                  ? "Changes detected - ready to save"
                  : "No changes made"}
              </Text>
            </View>

            <View
              style={{
                backgroundColor: hasChanges
                  ? theme.colors.tertiary
                  : theme.colors.outline,
                paddingHorizontal: theme.spacing.sm,
                paddingVertical: theme.spacing.xs,
                borderRadius: theme.borderRadius.full,
              }}
            >
              <Text
                variant="bodyXSmallRegular"
                color={hasChanges ? "onTertiary" : "onSurfaceVariant"}
              >
                {hasChanges ? "Modified" : "Unchanged"}
              </Text>
            </View>
          </View>
        </View>
      )}

      {/* Help Text */}
      <View
        style={{
          marginTop: theme.spacing.md,
          padding: theme.spacing.sm,
          backgroundColor: "transparent",
        }}
      >
        <Text
          variant="bodyXSmallRegular"
          color="onSurfaceVariant"
          style={{ textAlign: "center" }}
        >
          Changes are automatically validated. Save to update your recipe.
        </Text>
      </View>
    </Scroll>
  );
};
