import React from "react";
import { Share } from "react-native";
import { IconButton, IconVariant } from "@/components/ui";
import { ButtonSize, ButtonVariant } from "@/theme/types/componentVariants";

interface ShareButtonProps {
  title: string;
  message: string;
  url?: string;
  size?: ButtonSize;
  variant?: ButtonVariant;
  iconVariant?: IconVariant;
  disabled?: boolean;
}

export const ShareButton: React.FC<ShareButtonProps> = ({
  title,
  message,
  url,
  size = "md",
  variant = "ghost",
  iconVariant = "filled",
  disabled = false,
}) => {
  const handleShare = async () => {
    if (disabled) return;

    try {
      await Share.share({
        title,
        message: url ? `${message}\n${url}` : message,
        ...(url && { url }),
      });
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  return (
    <IconButton
      icon="share"
      variant={variant}
      iconVariant={iconVariant}
      size={size}
      onPress={handleShare}
      disabled={disabled}
      accessibilityLabel="Share item"
    />
  );
};
