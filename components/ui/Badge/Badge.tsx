import React from "react";
import { StyleProp, TextStyle, ViewStyle } from "react-native";
import { useTheme } from "../../../hooks/useTheme";
import { Text, View } from "../index";

type Variant = "primary" | "success" | "warning" | "danger";
type Size = "sm" | "md";

interface BadgeProps {
  label: string;
  variant?: Variant;
  size?: Size;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = "primary",
  size = "md",
  style,
  textStyle,
}) => {
  const { theme } = useTheme();

  const variantColorMap: Record<
    Variant,
    { bg: keyof typeof theme.colors; text: keyof typeof theme.colors }
  > = {
    primary: {
      bg: "primary",
      text: "onPrimary",
    },
    success: {
      bg: "tertiary",
      text: "onTertiary",
    },
    warning: {
      bg: "secondary",
      text: "onSecondary",
    },
    danger: {
      bg: "error",
      text: "onError",
    },
  };

  const { bg, text } = variantColorMap[variant];

  const horizontalPadding = size === "sm" ? theme.spacing.xs : theme.spacing.sm;
  const verticalPadding = size === "sm" ? 2 : 4;

  return (
    <View
      backgroundColor={bg}
      style={[
        {
          borderRadius: theme.borderRadius.round,
          paddingHorizontal: horizontalPadding,
          paddingVertical: verticalPadding,
          alignSelf: "flex-start",
        },
        style,
      ]}
    >
      <Text variant="label" color={text} fontWeight="medium" style={textStyle}>
        {label}
      </Text>
    </View>
  );
};
