import React from "react";
import { IconButton } from "@/components/ui";

interface FilterButtonProps {
  active?: boolean;
  onPress: () => void;
  size?: "sm" | "md" | "lg";
  variant?: "ghost" | "outline" | "primary";
  disabled?: boolean;
  hasActiveFilters?: boolean; // Shows if any filters are currently applied
}

export const FilterButton: React.FC<FilterButtonProps> = ({
  active = false,
  onPress,
  size = "md",
  variant = "ghost",
  disabled = false,
  hasActiveFilters = false,
}) => {
  const handlePress = () => {
    if (!disabled) {
      onPress();
    }
  };

  return (
    <IconButton
      icon="filter"
      active={active || hasActiveFilters}
      variant={variant}
      size={size}
      onPress={handlePress}
      disabled={disabled}
      accessibilityLabel={
        hasActiveFilters ? "Filter (filters applied)" : "Open filters"
      }
    />
  );
};
