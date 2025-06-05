// components/ui/Scroll/Scroll.tsx   (replace entire file)

import React from "react";
import {
  ScrollView,
  ScrollViewProps,
  StyleProp,
  ViewStyle,
} from "react-native";

import { useTheme } from "@/theme/hooks/useTheme";
import { ScrollVariant } from "@/theme/types/componentVariants";

/**
 * Themed ScrollView pulling base layout from theme.components.scroll
 * while allowing additional style overrides.
 */
interface ThemedScrollProps extends ScrollViewProps {
  /** "padded" | "flush" | "fullScreen" (see theme/constants/componentVariants/scrollVariants.ts) */
  variant?: ScrollVariant;

  /** Extra wrapper style */
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
}

export const Scroll: React.FC<ThemedScrollProps> = ({
  variant = "padded",
  style,
  contentContainerStyle,
  children,
  ...rest
}) => {
  const { theme } = useTheme();

  // base style from theme
  const variantStyle: ViewStyle = theme.components.scroll[variant];

  return (
    <ScrollView
      style={[variantStyle, style]}
      contentContainerStyle={contentContainerStyle}
      showsVerticalScrollIndicator={false}
      {...rest}
    >
      {children}
    </ScrollView>
  );
};
