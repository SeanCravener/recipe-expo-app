import React, { useState } from "react";
import { router } from "expo-router";
import { IconButton } from "@/components/ui";
import { useTheme } from "@/theme/hooks/useTheme";

interface SettingsButtonProps {
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  onPress?: () => void;
}

export const SettingsButton: React.FC<SettingsButtonProps> = ({
  size = "lg",
  disabled = false,
  onPress,
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const handlePress = () => {
    setIsPressed(true);

    // Reset pressed state after a short delay
    setTimeout(() => setIsPressed(false), 150);

    if (disabled) return;

    if (onPress) {
      onPress();
    } else {
      router.push("/settings");
    }
  };

  return (
    <IconButton
      icon="settings"
      variant="primary"
      iconVariant="filled"
      size={size}
      onPress={handlePress}
      disabled={disabled}
      active={isPressed}
      iconColor={isPressed ? "onPrimary" : "onSurface"}
      accessibilityLabel="Open settings"
    />
  );
};
