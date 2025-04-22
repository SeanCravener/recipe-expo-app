import {
  ScrollView,
  View,
  Pressable,
  Text,
  StyleSheet,
  Alert,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddItemSchema, addItemSchema } from "../../../lib/schemas";
import { ItemFormField } from "../../../components/ItemFormField";
import { ImageUploadField } from "../../../components/ImageUploadField";
import { DynamicList } from "../../../components/DynamicList";
import { InstructionList } from "../../../components/InstructionList";
import { useItem } from "../../../hooks/useItem";
import { useEditItem } from "../../../hooks/useEditItem";
import { useEffect } from "react";

export default function EditItem() {
  const { id } = useLocalSearchParams();
  const { data: item, isLoading } = useItem(id as string);
  const { editItem, deleteItem, isEditing, isDeleting } = useEditItem(
    id as string
  );

  const { control, handleSubmit, reset, watch } = useForm<AddItemSchema>({
    resolver: zodResolver(addItemSchema),
    defaultValues: {
      ingredients: [""],
      instructions: [{ instruction: "" }],
      categories: [""],
      tags: [""],
    },
  });

  // Set form default values when item data is loaded
  useEffect(() => {
    if (item) {
      reset({
        title: item.title,
        description: item.description,
        main_image: item.main_image,
        categories: item.categories,
        tags: item.tags,
        ingredients: item.ingredients,
        instructions: item.instructions.map((instruction) => ({
          instruction: instruction.instruction,
          image_url: instruction.image_url,
        })),
      });
    }
  }, [item, reset]);

  const {
    fields: categoryFields,
    append: appendCategory,
    remove: removeCategory,
  } = useFieldArray({
    control,
    name: "categories",
  });

  const {
    fields: tagFields,
    append: appendTag,
    remove: removeTag,
  } = useFieldArray({
    control,
    name: "tags",
  });

  const {
    fields: ingredientFields,
    append: appendIngredient,
    remove: removeIngredient,
  } = useFieldArray({
    control,
    name: "ingredients",
  });

  const {
    fields: instructionFields,
    append: appendInstruction,
    remove: removeInstruction,
  } = useFieldArray({
    control,
    name: "instructions",
  });

  const handleDelete = () => {
    Alert.alert(
      "Delete Recipe",
      "Are you sure you want to delete this recipe? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => deleteItem(),
        },
      ]
    );
  };

  if (isLoading) {
    return null; // Or show loading indicator
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
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
          onChange={(url) => control._setValue("main_image", url)}
        />
        <DynamicList
          control={control}
          name="categories"
          label="Categories"
          fields={categoryFields}
          append={appendCategory}
          remove={removeCategory}
          max={2}
          placeholder="Enter category"
        />
        <DynamicList
          control={control}
          name="tags"
          label="Tags"
          fields={tagFields}
          append={appendTag}
          remove={removeTag}
          max={10}
          placeholder="Enter tag"
        />
        <DynamicList
          control={control}
          name="ingredients"
          label="Ingredients"
          fields={ingredientFields}
          append={appendIngredient}
          remove={removeIngredient}
          max={20}
          placeholder="Enter ingredient"
        />
        <InstructionList
          control={control}
          fields={instructionFields}
          append={appendInstruction}
          remove={removeInstruction}
          max={20}
        />
        <View style={styles.buttonContainer}>
          <Pressable
            style={[styles.deleteButton, isDeleting && styles.buttonDisabled]}
            onPress={handleDelete}
            disabled={isDeleting || isEditing}
          >
            <Text style={styles.deleteButtonText}>
              {isDeleting ? "Deleting..." : "Delete Recipe"}
            </Text>
          </Pressable>
          <Pressable
            style={[styles.saveButton, isEditing && styles.buttonDisabled]}
            onPress={handleSubmit(editItem)}
            disabled={isDeleting || isEditing}
          >
            <Text style={styles.saveButtonText}>
              {isEditing ? "Saving..." : "Save Changes"}
            </Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  content: {
    padding: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
    marginTop: 24,
    marginBottom: 40,
  },
  deleteButton: {
    flex: 1,
    backgroundColor: "#FF3B30",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  saveButton: {
    flex: 1,
    backgroundColor: "#007AFF",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  deleteButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
