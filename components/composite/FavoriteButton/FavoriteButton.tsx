import React from "react";
import { IconButton } from "@/components/ui";
import { useFavorites } from "@/contexts/FavoritesContext";

interface FavoriteButtonProps {
  itemId: string;
  size?: "sm" | "md" | "lg";
  variant?: "ghost" | "outline" | "primary";
  disabled?: boolean;
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  itemId,
  size = "md",
  variant = "ghost",
  disabled = false,
}) => {
  const { favoritedItemIds, isLoading, toggleFavorite } = useFavorites();

  const isFavorited = favoritedItemIds.includes(itemId);

  const handlePress = () => {
    if (!isLoading && !disabled) {
      toggleFavorite(itemId, !isFavorited);
    }
  };

  return (
    <IconButton
      icon="favorite"
      active={isFavorited}
      variant={variant}
      size={size}
      iconColor="onPrimaryContainer"
      onPress={handlePress}
      disabled={isLoading || disabled}
      accessibilityLabel={
        isFavorited ? "Remove from favorites" : "Add to favorites"
      }
    />
  );
};
