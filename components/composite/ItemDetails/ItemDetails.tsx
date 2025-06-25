import React from "react";
import { View, Text } from "@/components/ui";
import {
  FavoriteButton,
  RatingDisplay,
  AuthorInfo,
} from "@/components/composite";
import { Ingredient } from "@/types/item";

export interface ItemDetailsProps {
  id: string;
  title: string;
  category: string;
  rating: number;
  description: string;
  ingredients: Ingredient[];
  authorId: string;
}

export const ItemDetails: React.FC<ItemDetailsProps> = ({
  id,
  title,
  category,
  rating,
  description,
  ingredients,
  authorId,
}) => {
  return (
    <View padding="lg" style={{ gap: 2 }}>
      {/* Header Section */}
      <View variant="row" style={{ alignItems: "center", marginBottom: 8 }}>
        <View style={{ flex: 1, marginRight: 8 }}>
          <Text variant="headerThree" numberOfLines={2}>
            {title}
          </Text>
          <View style={{ gap: 2 }}>
            <RatingDisplay value={rating} displayType="full" size={20} />

            <Text variant="bodySmallRegular" color="onSurfaceVariant">
              {category}
            </Text>
          </View>
        </View>
        <FavoriteButton variant="secondary" size="md" itemId={id} />
      </View>

      {/* Divider (TURN INTO SEPERATE UI COMPONENT LATER) */}
      <View
        style={{
          marginVertical: 12,
          borderRadius: 8,
          borderWidth: 1,
          marginHorizontal: 6,
          borderColor: "#CFE8E9", // Fix later, change to constant. Pull from theme?
        }}
      ></View>

      {/* Description */}
      <Text variant="bodyNormalBold">Description</Text>
      <Text variant="bodyNormalRegular">{description}</Text>

      {/* Divider (TURN INTO SEPERATE UI COMPONENT LATER) */}
      <View
        style={{
          marginVertical: 12,
          borderRadius: 8,
          borderWidth: 1,
          marginHorizontal: 6,
          borderColor: "#CFE8E9", // Fix later, change to constant. Pull from theme?
        }}
      ></View>

      {/* Ingredients */}
      <View
        variant="row"
        style={{
          marginBottom: 4,
          justifyContent: "space-between",
          alignItems: "baseline",
        }}
      >
        <Text variant="bodyNormalBold">Ingredients</Text>
        <Text variant="bodyXSmallRegular" color="secondaryPressed">
          {ingredients.length} items
        </Text>
      </View>
      <View style={{ gap: 4 }}>
        {ingredients.map((ingredient, index) => (
          <Text key={index} variant="bodyNormalRegular" color="onSurface">
            • {ingredient.value}
          </Text>
        ))}
      </View>

      {/* Divider (TURN INTO SEPERATE UI COMPONENT LATER) */}
      <View
        style={{
          marginVertical: 12,
          borderRadius: 8,
          borderWidth: 1,
          marginHorizontal: 6,
          borderColor: "#CFE8E9", // Fix later, change to constant. Pull from theme?
        }}
      ></View>

      <Text variant="bodyNormalBold">Author</Text>
      <AuthorInfo userId={authorId} size="sm"></AuthorInfo>
    </View>
  );
};
