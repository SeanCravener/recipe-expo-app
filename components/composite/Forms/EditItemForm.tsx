import React, { useEffect } from "react";
import { Alert } from "react-native";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { itemFormSchema } from "@/lib/schemas";
import { ItemFormData } from "@/types/item";
import { useDeferredFormImages } from "@/hooks/useDeferredFormImages";
import { useTheme } from "@/theme/hooks/useTheme";
import {
  View,
  Scroll,
  Button,
  Error,
  Text,
  Loading,
  Modal,
} from "@/components/ui";
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
  onSubmit: (data: ItemFormData & { imagesToCleanup?: string[] }) => void;
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

  // Deferred image handling
  const {
    setLocalImage,
    clearLocalImage,
    clearAllLocalImages,
    uploadAllImages,
    isUploading,
    getLocalImageUri,
    hasLocalImage,
  } = useDeferredFormImages();

  // Custom resolver that handles deferred images
  const customResolver = React.useCallback(
    async (data: any, context: any, options: any) => {
      // If we have a local image but no URL, temporarily satisfy validation
      const dataToValidate = { ...data };
      if (hasLocalImage("main_image") && !dataToValidate.main_image) {
        dataToValidate.main_image = "will-be-uploaded";
      }

      // Run the normal validation
      return zodResolver(itemFormSchema)(dataToValidate, context, options);
    },
    [hasLocalImage]
  );

  const { control, handleSubmit, setValue, watch, reset, formState } =
    useForm<ItemFormData>({
      resolver: customResolver,
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
    clearAllLocalImages();
  }, [initialValues, reset, clearAllLocalImages]);

  const handleFormSubmit = async (data: ItemFormData) => {
    console.log("Form submitted", data);

    try {
      // Track images that need cleanup
      const imagesToCleanup: string[] = [];

      // First, upload all local images
      const uploadResults = await uploadAllImages();
      console.log("Upload results:", uploadResults);

      // Create a clean copy of the data
      let finalData = { ...data };

      // Update form data with uploaded URLs and track replaced images
      uploadResults.forEach(({ fieldPath, url }) => {
        if (fieldPath === "main_image") {
          // If replacing main image, mark old one for cleanup
          if (initialValues.main_image && initialValues.main_image !== url) {
            imagesToCleanup.push(initialValues.main_image);
          }
          finalData.main_image = url;
        } else if (fieldPath.startsWith("instructions.")) {
          const match = fieldPath.match(/instructions\.(\d+)\.image-url/);
          if (match) {
            const index = parseInt(match[1]);
            if (finalData.instructions[index]) {
              // If replacing instruction image, mark old one for cleanup
              const oldUrl = initialValues.instructions[index]?.["image-url"];
              if (oldUrl && oldUrl !== url) {
                imagesToCleanup.push(oldUrl);
              }
              finalData.instructions[index]["image-url"] = url;
            }
          }
        }
      });

      // Also check for removed instruction images
      initialValues.instructions.forEach((instruction, index) => {
        if (instruction["image-url"]) {
          // If this instruction still exists in final data
          if (finalData.instructions[index]) {
            // If the image was removed (not replaced)
            if (
              !finalData.instructions[index]["image-url"] &&
              !hasLocalImage(`instructions.${index}.image-url`)
            ) {
              imagesToCleanup.push(instruction["image-url"]);
            }
          } else {
            // Instruction was deleted, cleanup its image
            imagesToCleanup.push(instruction["image-url"]);
          }
        }
      });

      console.log("Final data to submit:", finalData);
      console.log("Images to cleanup:", imagesToCleanup);

      // Submit with uploaded URLs and cleanup list
      onSubmit({ ...finalData, imagesToCleanup });
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

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

  const isFormDisabled = isSaving || isDeleting || isUploading;

  // Handle main image selection
  const handleMainImagePicked = (uri: string) => {
    if (uri) {
      setLocalImage("main_image", uri, "item-images");
      // Clear the form value to indicate change
      setValue("main_image", "");
    } else {
      clearLocalImage("main_image");
      // Restore original value
      setValue("main_image", initialValues.main_image);
    }
  };

  // Check if main image is valid (either original URL or local image)
  const mainImageValue = watch("main_image");
  const hasValidMainImage = mainImageValue || hasLocalImage("main_image");

  return (
    <Scroll
      variant="flush"
      style={{ flex: 1 }}
      contentContainerStyle={{
        padding: 16,
        paddingBottom: 120,
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
          helpText="Update your recipe photo"
          height={240}
          placeholder="Change Recipe Photo"
          deferUpload={true}
          onImagePicked={handleMainImagePicked}
          localImageUri={getLocalImageUri("main_image")}
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
          onDelete={(index) => {
            // Clear local image for this instruction if it exists
            clearLocalImage(`instructions.${index}.image-url`);
            instructionsArray.remove(index);

            // Update field paths for remaining instruction images
            const totalInstructions = instructionsArray.fields.length;
            for (let i = index + 1; i < totalInstructions; i++) {
              const oldPath = `instructions.${i}.image-url`;
              const newPath = `instructions.${i - 1}.image-url`;
              const uri = getLocalImageUri(oldPath);
              if (uri) {
                clearLocalImage(oldPath);
                setLocalImage(newPath, uri, "instruction-images");
              }
            }
          }}
          disabled={isFormDisabled}
          maxItems={15}
          deferUpload={true}
          onInstructionImagePicked={(index, uri) => {
            if (uri) {
              setLocalImage(
                `instructions.${index}.image-url`,
                uri,
                "instruction-images"
              );
            } else {
              clearLocalImage(`instructions.${index}.image-url`);
            }
          }}
          localImageUris={(() => {
            const uris: { [key: number]: string } = {};
            instructionsArray.fields.forEach((_, index) => {
              const uri = getLocalImageUri(`instructions.${index}.image-url`);
              if (uri) {
                uris[index] = uri;
              }
            });
            return uris;
          })()}
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
          onPress={handleSubmit(handleFormSubmit)}
          disabled={isFormDisabled || !formState.isValid}
          loading={isSaving || isUploading}
          style={{ flex: 1 }}
        >
          {isSaving
            ? "Saving..."
            : isUploading
            ? "Uploading..."
            : "Save Changes"}
        </Button>
      </View>

      {/* Upload Progress Modal */}
      {isUploading && (
        <Modal
          visible={isUploading}
          onClose={() => {}}
          contentStyle={{
            width: "80%",
            maxWidth: 300,
            padding: theme.spacing.lg,
          }}
        >
          <View variant="centered">
            <Loading variant="spinner" />
            <Text
              variant="bodyNormalMedium"
              style={{ marginTop: theme.spacing.md }}
            >
              Uploading Images...
            </Text>
          </View>
        </Modal>
      )}
    </Scroll>
  );
};
