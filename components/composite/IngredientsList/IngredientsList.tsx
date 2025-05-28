import React from "react";
import { useTheme } from "@/hooks/useTheme";
import { View, Text } from "@/components/ui";

interface IngredientsListProps {
  ingredients: string[];
}

export const IngredientsList: React.FC<IngredientsListProps> = ({
  ingredients,
}) => {
  const { theme } = useTheme();

  return (
    <View padding="md">
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: theme.spacing.md,
        }}
      >
        <Text variant="title" fontWeight="bold">
          Ingredients
        </Text>
        <Text
          variant="label"
          color="onSurfaceVariant"
          style={{ marginLeft: theme.spacing.xs }}
        >
          ({ingredients.length})
        </Text>
      </View>

      {ingredients.map((ingredient, index) => (
        <Text
          key={index}
          variant="body"
          color="onSurface"
          style={{
            marginBottom: theme.spacing.sm,
            lineHeight: theme.typography.lineHeight.relaxed,
          }}
        >
          • {ingredient}
        </Text>
      ))}
    </View>
  );
};
