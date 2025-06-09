import React from "react";
import { View, Text } from "@/components/ui";
import { FavoriteButton, RatingDisplay } from "@/components/composite";
import { Ingredient } from "@/types/item";

export interface ItemDetailsProps {
  id: string;
  title: string;
  category: string;
  rating: number;
  description: string;
  ingredients: Ingredient[];
}

export const ItemDetails: React.FC<ItemDetailsProps> = ({
  id,
  title,
  category,
  rating,
  description,
  ingredients,
}) => {
  return (
    <View padding="lg" style={{ gap: 16 }}>
      {/* Header Section */}
      <View variant="row" style={{ alignItems: "center" }}>
        <Text
          variant="headerThree"
          numberOfLines={1}
          style={{
            flex: 1,
            marginRight: 8,
          }}
        >
          {title}
        </Text>
        <FavoriteButton itemId={id} />
      </View>

      {/* Rating and Category */}
      <RatingDisplay value={rating} displayType="full" size={20} />

      <Text variant="bodySmallRegular" color="onSurfaceVariant">
        {category}
      </Text>

      {/* Description */}
      <View style={{ marginTop: 8 }}>
        <Text variant="bodyNormalBold" style={{ marginBottom: 8 }}>
          Description
        </Text>
        <Text variant="bodyNormalRegular">{description}</Text>
      </View>

      {/* Ingredients */}
      <View style={{ marginTop: 8 }}>
        <Text variant="bodyNormalBold" style={{ marginBottom: 8 }}>
          Ingredients ({ingredients.length})
        </Text>
        <View style={{ gap: 4 }}>
          {ingredients.map((ingredient, index) => (
            <Text key={index} variant="bodyNormalRegular" color="onSurface">
              • {ingredient.value}
            </Text>
          ))}
        </View>
      </View>
    </View>
  );
};
