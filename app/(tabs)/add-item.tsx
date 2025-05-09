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
import { itemFormSchema } from "../../lib/schemas";
import { ItemFormData, Instruction } from "../../types/item";
import { ItemFormField } from "../../components/ItemFormField";
import { ImageUploadField } from "../../components/ImageUploadField";
import { CategorySelect } from "../../components/CategorySelect";
import { useRouter } from "expo-router";
import { useAuth } from "../../contexts/auth/AuthContext";
import { useAddItem } from "../../hooks/useAddItem";

export default function AddItem() {
  const { session } = useAuth();
  const router = useRouter();

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

  const addItemMutation = useAddItem(session?.user.id);

  const onSubmit = (data: ItemFormData) => {
    addItemMutation.mutate(data, {
      onSuccess: (item) => {
        // Reset the form after successful creation
        reset();
        // Navigate to the detail page (replace so AddItem isn't in backstack)
        router.navigate(`/items/${item.id}`);
      },
      onError: (error) => {
        Alert.alert(
          "Error",
          error instanceof Error ? error.message : "An error occurred"
        );
      },
    });
  };

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
        <Pressable
          style={[
            styles.submitButton,
            addItemMutation.isPending && styles.buttonDisabled,
          ]}
          onPress={handleSubmit(onSubmit)}
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
  submitButton: {
    backgroundColor: "#34C759",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 24,
    marginBottom: 40,
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  buttonDisabled: {
    opacity: 0.5,
  },
});
