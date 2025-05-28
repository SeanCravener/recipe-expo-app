import React from "react";
import { Pressable } from "react-native";
import { Controller, Control } from "react-hook-form";
import { useTheme } from "@/hooks/useTheme";
import { useCategories } from "@/hooks/useCategories";
import { ItemFormData } from "@/types/item";
import { View, Text } from "@/components/ui";

interface CategorySelectProps {
  control: Control<ItemFormData>;
}

export const CategorySelect: React.FC<CategorySelectProps> = ({ control }) => {
  const { data: categories, isLoading } = useCategories();
  const { theme } = useTheme();

  if (isLoading || !categories) return null;

  return (
    <Controller
      control={control}
      name="category_id"
      render={({ field: { value, onChange } }) => (
        <View margin="md">
          <Text
            variant="title"
            fontWeight="bold"
            style={{ marginBottom: theme.spacing.sm }}
          >
            Category
          </Text>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              gap: theme.spacing.sm,
            }}
          >
            {categories.map((category) => {
              const selected = value === category.id;
              return (
                <Pressable
                  key={category.id}
                  onPress={() => onChange(category.id)}
                  style={{
                    paddingHorizontal: theme.spacing.md,
                    paddingVertical: theme.spacing.xs,
                    borderRadius: theme.borderRadius.lg,
                    backgroundColor: selected
                      ? theme.colors.primary
                      : theme.colors.surfaceVariant,
                  }}
                >
                  <Text
                    variant="label"
                    color={selected ? "onPrimary" : "onSurfaceVariant"}
                    fontWeight={selected ? "bold" : "regular"}
                  >
                    {category.category}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      )}
    />
  );
};
