import React from "react";
import { Pressable, Image, StyleSheet } from "react-native";
import { useFavorites } from "../contexts/FavoritesContext"; // Adjust path as needed

interface FavoriteButtonProps {
  itemId: string; // UUID of the item to favorite/unfavorite
  size?: number; // Optional size for the icon (default 24)
  isFavorited?: boolean; // Optional prop if favorite status is explicitly passed (rarely used now)
}

const FavoriteButton = ({
  itemId,
  size = 24,
  isFavorited: providedIsFavorited,
}: FavoriteButtonProps) => {
  const { favoritedItemIds, isLoading, toggleFavorite } = useFavorites();

  // Use provided isFavorited if explicitly passed, else check context
  const isFavorited =
    providedIsFavorited !== undefined
      ? providedIsFavorited
      : favoritedItemIds.includes(itemId);

  const handlePress = () => {
    if (!isLoading) {
      toggleFavorite(itemId, !isFavorited);
    }
  };

  return (
    <Pressable
      onPress={handlePress}
      style={styles.container}
      disabled={isLoading}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
    >
      <Image
        source={
          isFavorited
            ? require("../assets/heart-filled.png") // Replace with your filled heart image
            : require("../assets/heart-unfilled.png") // Replace with your unfilled heart image
        }
        style={[styles.icon, { width: size, height: size }]}
        resizeMode="contain"
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    tintColor: "#FF3B30", // Optional: Tint color for the heart (iOS red); adjust as needed
  },
});

export default FavoriteButton;
