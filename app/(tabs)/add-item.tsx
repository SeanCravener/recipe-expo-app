import {
  ScrollView,
  View,
  Pressable,
  Text,
  StyleSheet,
  Alert,
} from "react-native";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddItemSchema, addItemSchema } from "../../lib/schemas";
import { ItemFormField } from "../../components/ItemFormField";
import { ImageUploadField } from "../../components/ImageUploadField";
import { DynamicList } from "../../components/DynamicList";
import { InstructionList } from "../../components/InstructionList";
import { useMutation } from "@tanstack/react-query";
import { supabase } from "../../lib/supabase";
import { router } from "expo-router";

export default function AddItem() {
  const { control, handleSubmit, watch } = useForm<AddItemSchema>({
    resolver: zodResolver(addItemSchema),
    defaultValues: {
      ingredients: [""],
      instructions: [{ instruction: "" }],
      categories: [""],
      tags: [""],
    },
  });

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

  const addItemMutation = useMutation({
    mutationFn: async (data: AddItemSchema) => {
      // ... existing mutation logic ...
    },
    onSuccess: (item) => {
      Alert.alert("Success", "Recipe added successfully!", [
        {
          text: "OK",
          onPress: () => router.push(`/items/${item.id}`),
        },
      ]);
    },
  });

  const onSubmit = handleSubmit((data) => {
    addItemMutation.mutate(data);
  });

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
        <Pressable
          style={[
            styles.submitButton,
            addItemMutation.isPending && styles.buttonDisabled,
          ]}
          onPress={onSubmit}
          disabled={addItemMutation.isPending}
        >
          <Text style={styles.submitButtonText}>
            {addItemMutation.isPending ? "Adding..." : "Add Recipe"}
          </Text>
        </Pressable>
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
  submitButton: {
    backgroundColor: "#007AFF",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 24,
    marginBottom: 40,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
