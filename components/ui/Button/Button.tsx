import React from "react";
import {
  Pressable,
  ActivityIndicator,
  StyleProp,
  ViewStyle,
  TextStyle,
  PressableStateCallbackType,
} from "react-native";

import { useTheme } from "@/theme/hooks/useTheme";
import { ButtonVariant, ButtonSize } from "@/theme/types/componentVariants";
import { Text } from "@/components/ui";

export interface ButtonProps
  extends Omit<React.ComponentProps<typeof Pressable>, "style"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;

  /** Reduces padding for icon-only buttons */
  compact?: boolean;

  /** Optional overrides */
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;

  /**
   * Optional Pressable.style callback or style object/array.
   * We add it back explicitly so TypeScript knows it exists.
   */
  style?:
    | StyleProp<ViewStyle>
    | ((state: PressableStateCallbackType) => StyleProp<ViewStyle>);

  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  fullWidth = false,
  loading = false,
  disabled = false,
  compact = false,
  children,
  containerStyle,
  labelStyle,
  style,
  ...rest
}) => {
  const { theme } = useTheme();
  const { container, label } = theme.components.button[variant][size];

  const enhancedStyles: ViewStyle = {
    ...container,
    ...(fullWidth && {
      alignSelf: "stretch",
      width: "100%",
    }),
    ...(disabled && {
      opacity: 0.5,
    }),
    ...(compact && {
      paddingVertical: Math.max(
        typeof container.paddingVertical === "number"
          ? container.paddingVertical * 0.5
          : 8,
        4
      ),
      paddingHorizontal: Math.max(
        typeof container.paddingHorizontal === "number"
          ? container.paddingHorizontal * 0.5
          : 8,
        4
      ),
    }),
  };

  // Combine all styles efficiently
  const finalStyle = React.useMemo(() => {
    const baseStyles: StyleProp<ViewStyle> = [enhancedStyles, containerStyle];

    if (typeof style === "function") {
      return (state: PressableStateCallbackType) => [
        ...baseStyles,
        style(state),
      ];
    }

    return [...baseStyles, style];
  }, [enhancedStyles, containerStyle, style]);

  // Memoized loading indicator color
  const loadingColor = React.useMemo(() => {
    return typeof label.color === "string"
      ? label.color
      : theme.colors.onPrimary;
  }, [label.color, theme.colors.onPrimary]);

  return (
    <Pressable
      disabled={disabled || loading}
      style={finalStyle}
      accessibilityRole="button"
      accessibilityState={{
        disabled: disabled || loading,
        busy: loading,
      }}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator
          color={loadingColor}
          size={size === "sm" ? "small" : "small"} // Keep consistent small size
        />
      ) : typeof children === "string" ? (
        <Text style={[label, labelStyle]}>{children}</Text>
      ) : (
        children
      )}
    </Pressable>
  );
};
