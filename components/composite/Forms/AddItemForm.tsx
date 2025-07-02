import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { itemFormSchema } from "@/lib/schemas";
import { ItemFormData } from "@/types/item";
import { useAddItem } from "@/hooks/useAddItem";
import { useDeferredFormImages } from "@/hooks/useDeferredFormImages";
import { supabase } from "@/lib/supabase";
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
import { deleteStorageFile } from "@/lib/storage";

interface AddItemFormProps {
  userId: string;
  onSuccess: (item: { id: string }) => void;
}

export const AddItemForm: React.FC<AddItemFormProps> = ({
  userId,
  onSuccess,
}) => {
  const addItemMutation = useAddItem(userId);
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
  // I don't really like this, but it allows me to bypass an issue I was having with validation and getting new items added to the database.
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

  const onSubmit = async (data: ItemFormData) => {
    console.log("Form submitted", data);

    let uploadedUrls: string[] = [];

    try {
      // First, upload all local images
      const uploadResults = await uploadAllImages();
      console.log("Upload results:", uploadResults);

      // Track uploaded URLs for potential cleanup
      uploadedUrls = uploadResults.map((result) => result.url);

      // Create a clean copy of the data
      let finalData = { ...data };

      // Update form data with uploaded URLs
      uploadResults.forEach(({ fieldPath, url }) => {
        if (fieldPath === "main_image") {
          finalData.main_image = url;
        } else if (fieldPath.startsWith("instructions.")) {
          const match = fieldPath.match(/instructions\.(\d+)\.image-url/);
          if (match) {
            const index = parseInt(match[1]);
            if (finalData.instructions[index]) {
              finalData.instructions[index]["image-url"] = url;
            }
          }
        }
      });

      // Ensure we don't have any placeholder values
      if (finalData.main_image === "pending" || finalData.main_image === "") {
        if (hasLocalImage("main_image")) {
          console.log("Main image failed to upload");
        }
      }

      console.log("Final data to submit:", finalData);

      // Submit with uploaded URLs
      addItemMutation.mutate(finalData, {
        onSuccess: (item) => {
          reset();
          clearAllLocalImages();
          onSuccess(item);
        },
        onError: async (error) => {
          console.error("Add item error:", error);
          // Clean up uploaded images if submission fails
          if (uploadedUrls.length > 0) {
            console.log("Cleaning up uploaded images after failure");
            for (const url of uploadedUrls) {
              try {
                const path = url.split("/").pop();
                if (path) {
                  const bucket = url.includes("instruction-images")
                    ? "instruction-images"
                    : "item-images";
                  await supabase.storage.from(bucket).remove([path]);
                }
              } catch (cleanupError) {
                console.error("Error cleaning up image:", cleanupError);
              }
            }
          }
        },
      });
    } catch (error) {
      console.error("Form submission error:", error);
      // Clean up any uploaded images if we failed before submission
      if (uploadedUrls.length > 0) {
        await Promise.all(uploadedUrls.map((url) => deleteStorageFile(url)));
        await Promise.all(uploadedUrls.map((url) => deleteStorageFile(url)));
      }
    }
  };

  const isFormDisabled = addItemMutation.isPending || isUploading;

  // Handle main image selection
  const handleMainImagePicked = (uri: string) => {
    if (uri) {
      setLocalImage("main_image", uri, "item-images");
      // Don't set a value in the form, let the custom resolver handle it
    } else {
      clearLocalImage("main_image");
    }
  };

  // Debug form state
  React.useEffect(() => {
    console.log("Form validation state:", {
      isValid: formState.isValid,
      errors: formState.errors,
      values: {
        title: watch("title"),
        description: watch("description"),
        main_image: watch("main_image"),
        category_id: watch("category_id"),
        ingredientsCount: watch("ingredients")?.length,
        instructionsCount: watch("instructions")?.length,
      },
    });
  }, [formState.isValid, formState.errors, watch]);

  return (
    <Scroll
      variant="flush"
      style={{ flex: 1 }}
      contentContainerStyle={{
        padding: 16,
        paddingBottom: 100,
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
          onPress={() => {
            reset();
            clearAllLocalImages();
          }}
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
    </Scroll>
  );
};
