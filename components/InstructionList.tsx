import { View, Text, Pressable, StyleSheet } from "react-native";
import { ItemFormField } from "./ItemFormField";
import { ImageUploadField } from "./ImageUploadField";
import { MaterialIcons } from "@expo/vector-icons";
import { Control } from "react-hook-form";

interface InstructionListProps {
  control: Control<any>;
  fields: Record<"id", string>[];
  append: () => void;
  remove: (index: number) => void;
  max: number;
}

export function InstructionList({
  control,
  fields,
  append,
  remove,
  max,
}: InstructionListProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.label}>Instructions</Text>
        <Text style={styles.count}>
          ({fields.length}/{max})
        </Text>
      </View>
      {fields.map((field, index) => (
        <View key={field.id} style={styles.instructionContainer}>
          <View style={styles.stepHeader}>
            <Text style={styles.stepNumber}>Step {index + 1}</Text>
            <Pressable
              onPress={() => remove(index)}
              style={styles.removeButton}
            >
              <MaterialIcons name="remove-circle" size={24} color="#FF3B30" />
            </Pressable>
          </View>
          <ItemFormField
            control={control}
            name={`instructions.${index}.instruction`}
            label="Instruction"
            placeholder="Enter instruction"
            multiline
          />
          <ImageUploadField
            label="Step Image (Optional)"
            value={control._getWatch(`instructions.${index}.image_url`)}
            onChange={(url) =>
              control._setValue(`instructions.${index}.image_url`, url)
            }
          />
        </View>
      ))}
      {fields.length < max && (
        <Pressable
          onPress={() => append({ instruction: "", image_url: "" })}
          style={styles.addButton}
        >
          <MaterialIcons name="add-circle" size={24} color="#007AFF" />
          <Text style={styles.addButtonText}>Add step</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
  },
  count: {
    marginLeft: 8,
    color: "#666",
  },
  instructionContainer: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
  },
  stepHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  stepNumber: {
    fontSize: 16,
    fontWeight: "600",
  },
  removeButton: {
    padding: 4,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
  },
  addButtonText: {
    marginLeft: 8,
    color: "#007AFF",
    fontSize: 16,
  },
});
