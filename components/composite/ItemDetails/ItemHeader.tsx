import React from "react";
import { View, Text } from "@/components/ui";
import { FavoriteButton, RatingDisplay } from "@/components/composite";

export interface ItemHeaderProps {
  id: string;
  title: string;
  category: string;
  rating: number;
}

export const ItemHeader: React.FC<ItemHeaderProps> = ({
  id,
  title,
  category,
  rating,
}) => {
  return (
    <View padding="lg" style={{ gap: 16 }}>
      <View variant="row" style={{ alignItems: "center" }}>
        <Text
          variant="headerThree"
          numberOfLines={1}
          style={{
            flex: 1,
            marginRight: 8, // space for favorite button
          }}
        >
          {title}
        </Text>
        <FavoriteButton itemId={id} />
      </View>

      <RatingDisplay value={rating} displayType="full" size={20} />

      <Text variant="bodySmallRegular" color="onSurfaceVariant">
        {category}
      </Text>
    </View>
  );
};
