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
  disabled,
  children,
  containerStyle,
  labelStyle,
  style,
  ...rest
}) => {
  const { theme } = useTheme();
  const { container, label } = theme.components.button[variant][size];

  const fullWidthStyle: ViewStyle | undefined = fullWidth
    ? { alignSelf: "stretch", width: "100%" }
    : undefined;

  const disabledStyle: ViewStyle | undefined = disabled
    ? { opacity: 0.5 }
    : undefined;

  /** base array used for both object and callback forms */
  const baseArray: StyleProp<ViewStyle> = [
    container,
    fullWidthStyle,
    disabledStyle,
    containerStyle,
  ];

  const pressableStyle =
    typeof style === "function"
      ? (state: PressableStateCallbackType) => [...baseArray, style(state)]
      : [...baseArray, style];

  return (
    <Pressable disabled={disabled || loading} style={pressableStyle} {...rest}>
      {loading ? (
        <ActivityIndicator color={label.color as string} />
      ) : (
        <Text style={[label, labelStyle]}>{children}</Text>
      )}
    </Pressable>
  );
};
