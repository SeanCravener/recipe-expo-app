import { View, Text, Pressable, StyleSheet } from "react-native";
import { ItemFormField } from "./ItemFormField";
import { MaterialIcons } from "@expo/vector-icons";
import { Control } from "react-hook-form";

interface DynamicListProps {
  control: Control<any>;
  name: string;
  label: string;
  fields: Record<"id", string>[];
  append: () => void;
  remove: (index: number) => void;
  max: number;
  placeholder?: string;
}

export function DynamicList({
  control,
  name,
  label,
  fields,
  append,
  remove,
  max,
  placeholder,
}: DynamicListProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.count}>
          ({fields.length}/{max})
        </Text>
      </View>
      {fields.map((field, index) => (
        <View key={field.id} style={styles.row}>
          <View style={styles.fieldContainer}>
            <ItemFormField
              control={control}
              name={`${name}.${index}`}
              label=""
              placeholder={placeholder}
            />
          </View>
          <Pressable onPress={() => remove(index)} style={styles.removeButton}>
            <MaterialIcons name="remove-circle" size={24} color="#FF3B30" />
          </Pressable>
        </View>
      ))}
      {fields.length < max && (
        <Pressable onPress={() => append()} style={styles.addButton}>
          <MaterialIcons name="add-circle" size={24} color="#007AFF" />
          <Text style={styles.addButtonText}>Add {label.toLowerCase()}</Text>
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
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  fieldContainer: {
    flex: 1,
  },
  removeButton: {
    marginLeft: 12,
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
