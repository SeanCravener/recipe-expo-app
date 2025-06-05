// components/ui/Image/Image.tsx
import React from "react";
import {
  Image as RNImage,
  ImageProps as RNImageProps,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
} from "react-native";

import { useTheme } from "@/theme/hooks/useTheme";
import { ImageVariant } from "@/theme/types/componentVariants";
import { BorderRadiusKey, SpacingKey } from "@/theme/types/keys";

/**
 * Design-system Image.
 * • Pulls default style from theme.components.image[variant]
 * • Allows token-based overrides without conflicting
 *   with native Image props.
 */
export interface ThemedImageProps
  extends Omit<RNImageProps, "source" | "style"> {
  /** Variant key: "thumbnail" | "cover" | "contain" */
  variant?: ImageVariant;
  /** Required image source */
  source: ImageSourcePropType;

  /** Token overrides (renamed to avoid prop collision) */
  borderRadiusToken?: BorderRadiusKey;
  marginToken?: SpacingKey;

  /** Extra style overrides */
  style?: StyleProp<ImageStyle>;
}

export const Image: React.FC<ThemedImageProps> = ({
  variant = "cover",
  source,
  borderRadiusToken,
  marginToken,
  style,
  ...rest
}) => {
  const { theme } = useTheme();

  // base design-system style
  const baseStyle: ImageStyle = theme.components.image[variant];

  // token overrides
  const override: ImageStyle = {
    ...(borderRadiusToken && {
      borderRadius: theme.borderRadius[borderRadiusToken],
    }),
    ...(marginToken && { margin: theme.spacing[marginToken] }),
  };

  return (
    <RNImage source={source} style={[baseStyle, override, style]} {...rest} />
  );
};
