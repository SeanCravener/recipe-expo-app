import React from "react";
import { Share } from "react-native";
import { IconButton } from "@/components/ui";

interface ShareButtonProps {
  title: string;
  message: string;
  url?: string;
  size?: "sm" | "md" | "lg";
  variant?: "ghost" | "outline" | "primary";
  disabled?: boolean;
}

export const ShareButton: React.FC<ShareButtonProps> = ({
  title,
  message,
  url,
  size = "md",
  variant = "ghost",
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
      size={size}
      onPress={handleShare}
      disabled={disabled}
      accessibilityLabel="Share item"
    />
  );
};
