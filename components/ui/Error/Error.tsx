import React from "react";
import { StyleProp, ViewStyle, TextStyle } from "react-native";

import { useTheme } from "@/theme/hooks/useTheme";
import { ErrorVariant } from "@/theme/types/componentVariants";
import { View, Text } from "@/components/ui";

interface ErrorProps {
  variant?: ErrorVariant; // "text" | "box"
  message: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
}

export const Error: React.FC<ErrorProps> = ({
  variant = "text",
  message,
  containerStyle,
  labelStyle,
}) => {
  const { theme } = useTheme();
  const { container, label } = theme.components.error[variant];

  return (
    <View style={[container, containerStyle]}>
      <Text style={[label, labelStyle]}>{message}</Text>
    </View>
  );
};
