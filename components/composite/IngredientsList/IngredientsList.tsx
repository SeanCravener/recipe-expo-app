import React from "react";
import { View, Text } from "@/components/ui";
import { Ingredient } from "@/types/item";

interface IngredientsListProps {
  ingredients: Ingredient[];
}

export const IngredientsList: React.FC<IngredientsListProps> = ({
  ingredients,
}) => {
  return (
    <View padding="md">
      <View variant="row" style={{ marginBottom: 16 }}>
        <Text variant="bodyNormalBold">Ingredients</Text>
        <Text
          variant="bodySmallRegular"
          color="onSurfaceVariant"
          style={{ marginLeft: 4 }}
        >
          ({ingredients.length})
        </Text>
      </View>

      <View style={{ gap: 8 }}>
        {ingredients.map((ingredient, index) => (
          <Text key={index} variant="bodyNormalRegular" color="onSurface">
            • {ingredient.value}
          </Text>
        ))}
      </View>
    </View>
  );
};
