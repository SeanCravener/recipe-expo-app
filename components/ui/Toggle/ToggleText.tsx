import React from "react";
import { Pressable, StyleProp, ViewStyle, TextStyle } from "react-native";

import { useTheme } from "@/theme/hooks/useTheme";
import { ToggleTextVariant } from "@/theme/types/componentVariants";

import { View, Text } from "@/components/ui";

interface ToggleTextProps {
  variant?: ToggleTextVariant; // "pill" | "underline"
  active?: boolean;
  onPress?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  children: React.ReactNode;
}

export const ToggleText: React.FC<ToggleTextProps> = ({
  variant = "underline",
  active = false,
  onPress,
  containerStyle,
  labelStyle,
  children,
}) => {
  const { theme } = useTheme();
  const { container, label } = theme.components.toggleText[variant];

  const activeStyle: TextStyle | undefined = active
    ? { color: theme.colors.primary }
    : undefined;

  return (
    <Pressable onPress={onPress}>
      <View style={[container, containerStyle]}>
        <Text style={[label, activeStyle, labelStyle]}>{children}</Text>
      </View>
    </Pressable>
  );
};
