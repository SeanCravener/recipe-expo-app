import React from "react";
import { ActivityIndicator } from "react-native";

import { useTheme } from "@/theme/hooks/useTheme";
import { LoadingVariant } from "@/theme/types/componentVariants";
import { View } from "@/components/ui";

interface LoadingProps {
  variant?: LoadingVariant; // "spinner" | "overlay"
  colorScheme?: "primary" | "surface"; // optional palette override
}

export const Loading: React.FC<LoadingProps> = ({
  variant = "spinner",
  colorScheme = "primary",
}) => {
  const { theme } = useTheme();
  const spinnerColor =
    colorScheme === "primary" ? theme.colors.primary : theme.colors.onSurface;

  if (variant === "overlay") {
    const overlayStyle = theme.components.loading.overlay;
    return (
      <View style={overlayStyle}>
        <ActivityIndicator color={spinnerColor} />
      </View>
    );
  }

  const spinnerStyle = theme.components.loading.spinner;
  return (
    <View style={spinnerStyle}>
      <ActivityIndicator color={spinnerColor} />
    </View>
  );
};
