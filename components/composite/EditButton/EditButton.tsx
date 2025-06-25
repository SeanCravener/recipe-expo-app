// Possibly can just remove this file and use the IconButton directly
// Already removed from [id].tsx and replaced with IconButton directly
import React from "react";
import { IconButton } from "@/components/ui";
import { ButtonVariant, ButtonSize } from "@/theme/types/componentVariants";
import { StyleProp, ViewStyle } from "react-native";

interface EditButtonProps {
  size?: ButtonSize;
  variant?: ButtonVariant;
  disabled?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>; // Add style prop
}

export const EditButton: React.FC<EditButtonProps> = ({
  size = "md",
  variant = "ghost",
  disabled = false,
  onPress,
  style, // Accept style prop
}) => {
  return (
    <IconButton
      icon="edit-one"
      iconVariant="filled"
      variant={variant}
      size={size}
      onPress={onPress}
      disabled={disabled}
      accessibilityLabel="Edit Item"
      style={[style]} // Pass through style prop
      compact={true}
    />
  );
};
