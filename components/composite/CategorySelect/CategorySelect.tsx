import React from "react";
import { Controller, Control } from "react-hook-form";
import { useCategories } from "@/hooks/useCategories";
import { ItemFormData } from "@/types/item";
import { View, Text, ToggleText, Loading } from "@/components/ui";

interface CategorySelectProps {
  control: Control<ItemFormData>;
}

export const CategorySelect: React.FC<CategorySelectProps> = ({ control }) => {
  const { data: categories, isLoading } = useCategories();

  if (isLoading) {
    return <Loading variant="spinner" />;
  }

  if (!categories) return null;

  return (
    <Controller
      control={control}
      name="category_id"
      render={({ field: { value, onChange } }) => (
        <View margin="md">
          <Text
            variant="bodyNormalBold"
            style={{ marginBottom: 8 }} // small fixed spacing
          >
            Category
          </Text>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 8, // consistent small gap
            }}
          >
            {categories.map((category) => {
              const selected = value === category.id;
              return (
                <ToggleText
                  key={category.id}
                  variant="pill"
                  active={selected}
                  onPress={() => onChange(category.id)}
                >
                  {category.category}
                </ToggleText>
              );
            })}
          </View>
        </View>
      )}
    />
  );
};
