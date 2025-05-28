// Need to finish optimizing and tweaking component for reuse. Commented out old code for reference.

import React from "react";
import {
  StyleProp,
  TextInput,
  TextInputProps,
  TextStyle,
  ViewStyle,
} from "react-native";
import { useTheme } from "../../../hooks/useTheme";
import { Text, View } from "../index";

// type Variant = "filled" | "outlined" | "unstyled";
type ColorKey = keyof ReturnType<typeof useTheme>["theme"]["colors"];

interface InputProps extends TextInputProps {
  label?: string;
  // variant?: Variant;
  color?: ColorKey;
  style?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
}

export const Input: React.FC<InputProps> = ({
  label,
  // variant = "filled",
  color = "primary",
  style,
  containerStyle,
  ...rest
}) => {
  const { theme } = useTheme();

  const baseStyle: TextStyle = {
    color: theme.colors.onPrimary,
    fontSize: theme.typography.fontSize.md,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    fontFamily: theme.typography.fontFamily.regular,
  };

  // const variantStyle: ViewStyle =
  //   variant === "outlined"
  //     ? {
  //         borderWidth: 1,
  //         borderColor: theme.colors.outline,
  //         backgroundColor: theme.colors.surface,
  //       }
  //     : variant === "filled"
  //     ? {
  //         backgroundColor: theme.colors.primary,
  //       }
  //     : {};

  // const containerBaseStyle: ViewStyle = {
  //   borderRadius: theme.borderRadius.sm,
  //   backgroundColor: theme.colors.primary,
  // };

  return (
    <View style={containerStyle}>
      {label && (
        <Text
          variant="label"
          color="onSurface"
          style={{ marginBottom: theme.spacing.xs }}
        >
          {label}
        </Text>
      )}
      <View style={{ backgroundColor: theme.colors.primary }}>
        <TextInput
          style={[baseStyle, style]}
          placeholderTextColor={theme.colors.onPrimary}
          {...rest}
        />
      </View>
    </View>
  );
};
