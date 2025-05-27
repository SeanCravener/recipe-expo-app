import React from "react";
import {
  GestureResponderEvent,
  StyleProp,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { useTheme } from "../../../hooks/useTheme";
import { Text } from "../index";

type Variant = "filled" | "outlined" | "text";
type ColorKey = "primary" | "secondary" | "tertiary";
type RadiusKey = keyof ReturnType<typeof useTheme>["theme"]["borderRadius"];
type ElevationKey = keyof ReturnType<typeof useTheme>["theme"]["elevation"];
type Size = "sm" | "md" | "lg";

interface ButtonProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  variant?: Variant;
  color?: ColorKey;
  radius?: RadiusKey;
  elevation?: ElevationKey;
  size?: Size;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = "filled",
  color = "primary",
  radius = "md",
  elevation = "level1",
  size = "md",
  disabled = false,
  style,
  textStyle,
}) => {
  const { theme } = useTheme();

  const sizePaddingMap: Record<Size, { vertical: number; horizontal: number }> =
    {
      sm: {
        vertical: theme.spacing.xs,
        horizontal: theme.spacing.md,
      },
      md: {
        vertical: theme.spacing.sm,
        horizontal: theme.spacing.lg,
      },
      lg: {
        vertical: theme.spacing.md,
        horizontal: theme.spacing.xl,
      },
    };

  const background = variant === "filled" ? theme.colors[color] : "transparent";

  const borderColor =
    variant === "outlined" ? theme.colors[color] : "transparent";

  const textColor =
    variant === "filled"
      ? theme.colors[`on${capitalize(color)}` as keyof typeof theme.colors]
      : theme.colors[color];

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        {
          backgroundColor: disabled ? theme.colors.surfaceVariant : background,
          borderRadius: theme.borderRadius[radius],
          borderWidth: variant === "outlined" ? 1 : 0,
          borderColor,
          paddingVertical: sizePaddingMap[size].vertical,
          paddingHorizontal: sizePaddingMap[size].horizontal,
          opacity: disabled ? theme.opacity.disabled : 1,
          alignItems: "center",
          justifyContent: "center",
          ...(elevation && theme.elevation[elevation]),
        },
        style,
      ]}
    >
      <Text
        variant="label"
        fontWeight="medium"
        color={textColor as ColorKey}
        style={textStyle}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
