import React from "react";
import {
  Text as RNText,
  TextProps as RNTextProps,
  StyleProp,
  TextStyle,
} from "react-native";

import { useTheme } from "@/theme/hooks/useTheme";
import { TextVariant } from "@/theme/types/componentVariants";
import {
  ColorKey,
  FontSizeKey,
  FontWeightKey,
  LineHeightKey,
} from "@/theme/types/keys";

/**
 * Themed Text component.
 * - Pulls default style from theme.components.text[variant]
 * - Allows token overrides for color, size, weight, lineHeight
 */
export interface ThemedTextProps extends RNTextProps {
  variant?: TextVariant; // "heading" | "body" | "caption"

  color?: ColorKey; // theme color token
  fontSize?: FontSizeKey; // override size token
  fontWeight?: FontWeightKey; // override weight token
  lineHeight?: LineHeightKey; // override line-height token

  style?: StyleProp<TextStyle>;
}

export const Text: React.FC<ThemedTextProps> = ({
  variant = "bodyNormalRegular",
  color,
  fontSize,
  fontWeight,
  lineHeight,
  style,
  children,
  ...rest
}) => {
  const { theme } = useTheme();

  // ① base style from theme variant
  const baseStyle: TextStyle = theme.components.text[variant];

  // ② token overrides (optional)
  const override: TextStyle = {
    ...(color && { color: theme.colors[color] }),
    ...(fontSize && { fontSize: theme.fontSize[fontSize] }),
    ...(fontWeight && { fontWeight: theme.fontWeight[fontWeight] as any }),
    ...(lineHeight && { lineHeight: theme.lineHeight[lineHeight] }),
  };

  return (
    <RNText style={[baseStyle, override, style]} {...rest}>
      {children}
    </RNText>
  );
};
