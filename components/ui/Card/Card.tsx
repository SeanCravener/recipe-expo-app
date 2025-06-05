import React from "react";
import { StyleProp, ViewStyle } from "react-native";

import { useTheme } from "@/theme/hooks/useTheme";
import { CardVariant } from "@/theme/types/componentVariants";

import { View } from "@/components/ui";

interface CardProps {
  variant?: CardVariant; // "filled" | "outlined" | "elevated"
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  variant = "filled",
  style,
  children,
  ...rest
}) => {
  const { theme } = useTheme();
  const cardStyle = theme.components.card[variant];

  return (
    <View style={[cardStyle, style]} {...rest}>
      {children}
    </View>
  );
};
