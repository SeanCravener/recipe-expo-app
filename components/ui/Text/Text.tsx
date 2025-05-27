import React from "react";
import {
  Text as RNText,
  TextProps as RNTextProps,
  StyleProp,
  TextStyle,
} from "react-native";
import { useTheme } from "../../../hooks/useTheme";

type Variant = keyof ReturnType<
  typeof useTheme
>["theme"]["typography"]["fontSize"];
type ColorKey = keyof ReturnType<typeof useTheme>["theme"]["colors"];
type FontWeight = keyof ReturnType<
  typeof useTheme
>["theme"]["typography"]["fontFamily"];

interface CustomTextProps extends RNTextProps {
  variant?: Variant;
  color?: ColorKey;
  fontWeight?: FontWeight;
  align?: TextStyle["textAlign"];
  style?: StyleProp<TextStyle>;
}

export const Text: React.FC<CustomTextProps> = ({
  children,
  variant = "body",
  color = "onBackground",
  fontWeight = "regular",
  align = "left",
  style,
  ...rest
}) => {
  const { theme } = useTheme();

  const textStyle: TextStyle = {
    fontSize: theme.typography.fontSize[variant],
    fontFamily: theme.typography.fontFamily[fontWeight],
    color: theme.colors[color],
    textAlign: align,
    lineHeight: theme.typography.lineHeight.normal,
  };

  return (
    <RNText style={[textStyle, style]} {...rest}>
      {children}
    </RNText>
  );
};
