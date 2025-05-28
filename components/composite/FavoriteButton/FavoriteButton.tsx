// components/composites/FavoriteButton.tsx
import React from "react";
import { Pressable } from "react-native";
import { Image } from "../../ui/index";
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
    <Pressable
      onPress={handlePress}
      style={{ padding: 5, justifyContent: "center", alignItems: "center" }}
      disabled={isLoading}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
    >
      <Image
        source={
          isFavorited
            ? require("../../../assets/heart-filled.png") // Replace with your filled heart image
            : require("../../../assets/heart-unfilled.png") // Replace with your unfilled heart image
        }
        style={[{ width: size, height: size }]}
        resizeMode="contain"
      />
    </Pressable>
  );
};
