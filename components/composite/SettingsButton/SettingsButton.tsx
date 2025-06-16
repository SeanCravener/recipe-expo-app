import React from "react";
import { router } from "expo-router";
import { IconButton } from "@/components/ui";

interface SettingsButtonProps {
  size?: "sm" | "md" | "lg";
  variant?: "ghost" | "outline" | "primary";
  disabled?: boolean;
  onPress?: () => void; // Optional custom action
}

export const SettingsButton: React.FC<SettingsButtonProps> = ({
  size = "md",
  variant = "ghost",
  disabled = false,
  onPress,
}) => {
  const handlePress = () => {
    if (disabled) return;

    if (onPress) {
      onPress();
    } else {
      // Default action: navigate to settings
      router.push("/settings");
    }
  };

  return (
    <IconButton
      icon="settings"
      variant={variant}
      size={size}
      onPress={handlePress}
      disabled={disabled}
      accessibilityLabel="Open settings"
    />
  );
};
