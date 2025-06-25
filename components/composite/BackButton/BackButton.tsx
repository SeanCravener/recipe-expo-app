// Possibly can just remove this file and use the IconButton directly
// Already removed from [id].tsx and replaced with IconButton directly
import React from "react";
import { IconButton } from "@/components/ui";
import { ButtonSize, ButtonVariant } from "@/theme/types/componentVariants";
import { StyleProp, ViewStyle } from "react-native";

interface BackButtonProps {
  size?: ButtonSize;
  variant?: ButtonVariant;
  disabled?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>; // Add style prop
}

export const BackButton: React.FC<BackButtonProps> = ({
  size = "md",
  variant = "ghost",
  disabled = false,
  onPress,
  style, // Accept style prop
}) => {
  const handlePress = () => {
    if (disabled) return;
    onPress;
  };

  return (
    <IconButton
      icon="arrow-back"
      variant={variant}
      size={size}
      onPress={handlePress}
      disabled={disabled}
      accessibilityLabel="Go back"
      style={style} // Pass through style prop
      compact={true}
    />
  );
};
