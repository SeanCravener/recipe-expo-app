import React from "react";
import { StyleProp, ViewStyle, TextStyle } from "react-native";

import { useTheme } from "@/theme/hooks/useTheme";
import { BadgeVariant } from "@/theme/types/componentVariants";

import { View, Text } from "@/components/ui";

interface BadgeProps {
  variant?: BadgeVariant; // "primary" | "success" | …
  children: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = "primary",
  children,
  containerStyle,
  labelStyle,
}) => {
  const { theme } = useTheme();
  const { container, label } = theme.components.badge[variant];

  return (
    <View style={[container, containerStyle]}>
      <Text style={[label, labelStyle]}>{children}</Text>
    </View>
  );
};
