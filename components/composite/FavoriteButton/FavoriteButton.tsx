import React from "react";
import { Image, Button } from "@/components/ui";
import { useFavorites } from "@/contexts/FavoritesContext";

interface FavoriteButtonProps {
  itemId: string; // unique identifier for the item
  isFavorited?: boolean;
  size?: number;
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  itemId,
  isFavorited: isFavoriteProp,
  size = 24,
}) => {
  const { favoritedItemIds, isLoading, toggleFavorite } = useFavorites();

  const isFavorited =
    isFavoriteProp !== undefined
      ? isFavoriteProp
      : favoritedItemIds.includes(itemId);

  const handlePress = () => {
    if (!isLoading) {
      toggleFavorite(itemId, !isFavorited);
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onPress={handlePress}
      disabled={isLoading}
      style={{
        padding: 5,
        minWidth: size + 10, // accommodate the image plus padding
        minHeight: size + 10,
      }}
    >
      <Image
        source={
          isFavorited
            ? require("../../../assets/heart-filled.png")
            : require("../../../assets/heart-unfilled.png")
        }
        variant="contain"
        style={{ width: size, height: size }}
      />
    </Button>
  );
};
