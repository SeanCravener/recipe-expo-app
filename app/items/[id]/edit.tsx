import {
  ScrollView,
  View,
  Pressable,
  Text,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { itemFormSchema } from "../../../lib/schemas";
import { ItemFormData, Instruction } from "../../../types/item";
import { ItemFormField } from "../../../components/ItemFormField";
import { ImageUploadField } from "../../../components/ImageUploadField";
import { CategorySelect } from "../../../components/CategorySelect";
import { useItem } from "../../../hooks/useItem";
import { useEditItem } from "../../../hooks/useEditItem";
import { useEffect } from "react";

export default function EditItem() {
  const { id } = useLocalSearchParams();
  const { data: item, isLoading } = useItem(id as string);
  const { editItem, deleteItem, isEditing, isDeleting } = useEditItem(
    id as string
  );

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

  useEffect(() => {
    if (item) {
      reset({
        title: item.title,
        description: item.description,
        main_image: item.main_image,
        category_id: item.category_id,
        ingredients: item.ingredients ?? [],
        instructions: item.instructions ?? [{ content: "", "image-url": "" }],
      });
    }
  }, [item, reset]);

  const handleDelete = () => {
    Alert.alert(
      "Delete Item",
      "Are you sure you want to delete this item? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => deleteItem(),
        },
      ]
    );
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
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

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ingredients</Text>
          {ingredientsArray.fields.map((field, index) => (
            <View key={field.id} style={styles.fieldRow}>
              <View style={styles.fieldContainer}>
                <ItemFormField
                  control={control}
                  name={`ingredients.${index}`}
                  label=""
                  placeholder="Enter ingredient"
                />
              </View>
              <Pressable
                onPress={() => ingredientsArray.remove(index)}
                style={styles.removeButton}
              >
                <Text style={styles.removeButtonText}>Remove</Text>
              </Pressable>
            </View>
          ))}
          <Pressable
            onPress={() => ingredientsArray.append("")}
            style={styles.addButton}
          >
            <Text style={styles.addButtonText}>Add Ingredient</Text>
          </Pressable>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Instructions</Text>
          {instructionsArray.fields.map((field, index) => (
            <View key={field.id} style={styles.instructionContainer}>
              <Text style={styles.stepNumber}>Step {index + 1}</Text>
              <ItemFormField
                control={control}
                name={`instructions.${index}.content`}
                label=""
                placeholder="Enter instruction"
                multiline
              />
              <ImageUploadField
                label="Step Image (Optional)"
                value={watch(`instructions.${index}.image-url`)}
                onChange={(url) =>
                  setValue(`instructions.${index}.image-url`, url)
                }
              />
              <Pressable
                onPress={() => instructionsArray.remove(index)}
                style={styles.removeButton}
              >
                <Text style={styles.removeButtonText}>Remove Step</Text>
              </Pressable>
            </View>
          ))}
          <Pressable
            onPress={() =>
              instructionsArray.append({
                content: "",
                "image-url": "",
              } as Instruction)
            }
            style={styles.addButton}
          >
            <Text style={styles.addButtonText}>Add Step</Text>
          </Pressable>
        </View>

        <View style={styles.buttonContainer}>
          <Pressable
            style={[styles.deleteButton, isDeleting && styles.buttonDisabled]}
            onPress={handleDelete}
            disabled={isDeleting || isEditing}
          >
            <Text style={styles.deleteButtonText}>
              {isDeleting ? "Deleting..." : "Delete Item"}
            </Text>
          </Pressable>
          <Pressable
            style={[styles.saveButton, isEditing && styles.buttonDisabled]}
            onPress={handleSubmit((data) => editItem(data))}
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

// ... previous code remains exactly the same until styles ...

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },
  fieldRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  fieldContainer: {
    flex: 1,
    marginRight: 8,
  },
  instructionContainer: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
  },
  stepNumber: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  removeButton: {
    backgroundColor: "#FF3B30",
    padding: 8,
    borderRadius: 6,
  },
  removeButtonText: {
    color: "white",
    fontSize: 14,
  },
  addButton: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  addButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
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
