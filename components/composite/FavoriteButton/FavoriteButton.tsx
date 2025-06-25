import React from "react";
import { IconButton } from "@/components/ui";
import { ButtonSize, ButtonVariant } from "@/theme/types/componentVariants";
import { useFavorites } from "@/contexts/FavoritesContext";

interface FavoriteButtonProps {
  itemId: string;
  size?: ButtonSize;
  variant?: ButtonVariant;
  disabled?: boolean;
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  itemId,
  size = "sm",
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
      compact={true}
    />
  );
};
