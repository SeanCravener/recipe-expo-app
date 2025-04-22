import { View, Text, Pressable, StyleSheet } from "react-native";
import { useCategories } from "../hooks/useCategories";
import { Control, Controller } from "react-hook-form";
import { ItemFormData } from "../types/item";

interface CategorySelectProps {
  control: Control<ItemFormData>;
}

export function CategorySelect({ control }: CategorySelectProps) {
  const { data: categories, isLoading } = useCategories();

  if (isLoading || !categories) {
    return null;
  }

  return (
    <Controller
      control={control}
      name="category_id"
      render={({ field: { value, onChange } }) => (
        <View style={styles.container}>
          <Text style={styles.label}>Category</Text>
          <View style={styles.options}>
            {categories.map((category) => (
              <Pressable
                key={category.id}
                style={[
                  styles.option,
                  value === category.id && styles.optionSelected,
                ]}
                onPress={() => onChange(category.id)}
              >
                <Text
                  style={[
                    styles.optionText,
                    value === category.id && styles.optionTextSelected,
                  ]}
                >
                  {category.category}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  options: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  option: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: "#f5f5f5",
  },
  optionSelected: {
    backgroundColor: "#007AFF",
  },
  optionText: {
    color: "#666",
  },
  optionTextSelected: {
    color: "white",
  },
});
