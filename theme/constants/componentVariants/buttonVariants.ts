// theme/constants/componentVariants/buttonVariants.ts
import { Theme } from "../../types/theme";
import { ButtonVariant, ButtonSize } from "../../types/componentVariants";
import { ViewStyle, TextStyle } from "react-native";

export interface ButtonStyle {
  container: ViewStyle;
  label: TextStyle;
}

export const createButtonVariants = (
  theme: Theme
): Record<ButtonVariant, Record<ButtonSize, ButtonStyle>> => {
  // size presets derived from spacing & typography
  const sizes: Record<ButtonSize, { py: number; px: number; fs: number }> = {
    sm: {
      py: theme.spacing.xs,
      px: theme.spacing.sm,
      fs: theme.fontSize.sm,
    },
    md: {
      py: theme.spacing.sm,
      px: theme.spacing.md,
      fs: theme.fontSize.md,
    },
    lg: {
      py: theme.spacing.md,
      px: theme.spacing.lg,
      fs: theme.fontSize.lg,
    },
  };

  // helper builder
  const build = (bg: string, fg: string): Record<ButtonSize, ButtonStyle> =>
    (Object.keys(sizes) as ButtonSize[]).reduce((acc, key) => {
      const s = sizes[key];
      acc[key] = {
        container: {
          backgroundColor: bg,
          paddingVertical: s.py,
          paddingHorizontal: s.px,
          borderRadius: theme.borderRadius.sm,
          alignItems: "center",
          justifyContent: "center",
          ...theme.elevation.level1,
        },
        label: {
          color: fg,
          fontSize: s.fs,
          fontWeight: theme.fontWeight.medium as any,
        },
      };
      return acc;
    }, {} as Record<ButtonSize, ButtonStyle>);

  return {
    primary: build(theme.colors.primary, theme.colors.onPrimary),
    secondary: build(theme.colors.secondary, theme.colors.onSecondary),
    danger: build(theme.colors.error, theme.colors.onError),
  };
};
