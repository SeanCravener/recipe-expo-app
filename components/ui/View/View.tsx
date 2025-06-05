// components/ui/View/View.tsx   (replace the entire file)

import React from "react";
import {
  View as RNView,
  ViewProps as RNViewProps,
  StyleProp,
  ViewStyle,
} from "react-native";

import { useTheme } from "@/theme/hooks/useTheme";

// token key unions
import {
  SpacingKey,
  ColorKey,
  BorderRadiusKey,
  ElevationKey,
} from "@/theme/types/keys";

// layout-variant union
import { ViewVariant } from "@/theme/types/componentVariants";

/**
 * Design-system View that pulls a layout variant from theme.components.view
 * but still allows fine-grained token overrides.
 */
interface ThemedViewProps extends RNViewProps {
  /** layout variant key (e.g. "centered", "card-square") */
  variant?: ViewVariant;

  /** optional per-prop token overrides */
  padding?: SpacingKey;
  margin?: SpacingKey;
  backgroundColor?: ColorKey;
  borderRadius?: BorderRadiusKey;
  elevation?: ElevationKey;

  style?: StyleProp<ViewStyle>;
}

export const View: React.FC<ThemedViewProps> = ({
  variant = "default",
  padding,
  margin,
  backgroundColor,
  borderRadius,
  elevation,
  style,
  children,
  ...rest
}) => {
  const { theme } = useTheme();

  // 1) base style from the selected variant
  const variantStyle: ViewStyle = theme.components.view[variant];

  // 2) optional token-based overrides
  const overrideStyle: ViewStyle = {
    ...(padding && { padding: theme.spacing[padding] }),
    ...(margin && { margin: theme.spacing[margin] }),
    ...(backgroundColor && {
      backgroundColor: theme.colors[backgroundColor],
    }),
    ...(borderRadius && {
      borderRadius: theme.borderRadius[borderRadius],
    }),
    ...(elevation && theme.elevation[elevation]),
  };

  return (
    <RNView style={[variantStyle, overrideStyle, style]} {...rest}>
      {children}
    </RNView>
  );
};
