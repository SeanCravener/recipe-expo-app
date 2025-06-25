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
          ...theme.elevation.card, // FIX THIS LATER
        },
        label: {
          color: fg,
          fontSize: s.fs,
          fontWeight: theme.fontWeight.medium as any,
        },
      };
      return acc;
    }, {} as Record<ButtonSize, ButtonStyle>);

  // outline variant builder
  const buildOutline = (
    borderColor: string,
    textColor: string
  ): Record<ButtonSize, ButtonStyle> =>
    (Object.keys(sizes) as ButtonSize[]).reduce((acc, key) => {
      const s = sizes[key];
      acc[key] = {
        container: {
          backgroundColor: "transparent",
          borderWidth: 1,
          borderColor: borderColor,
          paddingVertical: s.py,
          paddingHorizontal: s.px,
          borderRadius: theme.borderRadius.sm,
          alignItems: "center",
          justifyContent: "center",
          ...theme.elevation.level5,
        },
        label: {
          color: textColor,
          fontSize: s.fs,
          fontWeight: theme.fontWeight.medium as any,
        },
      };
      return acc;
    }, {} as Record<ButtonSize, ButtonStyle>);

  // link variant builder (no background, no border)
  const buildLink = (textColor: string): Record<ButtonSize, ButtonStyle> =>
    (Object.keys(sizes) as ButtonSize[]).reduce((acc, key) => {
      const s = sizes[key];
      acc[key] = {
        container: {
          backgroundColor: "transparent",
          paddingVertical: s.py,
          paddingHorizontal: s.px,
          alignItems: "center",
          justifyContent: "center",
        },
        label: {
          color: textColor,
          fontSize: s.fs,
          fontWeight: theme.fontWeight.medium as any,
          textDecorationLine: "underline",
        },
      };
      return acc;
    }, {} as Record<ButtonSize, ButtonStyle>);

  // ghost variant builder (subtle hover-like background)
  const buildGhost = (textColor: string): Record<ButtonSize, ButtonStyle> =>
    (Object.keys(sizes) as ButtonSize[]).reduce((acc, key) => {
      const s = sizes[key];
      acc[key] = {
        container: {
          backgroundColor: theme.colors.surfaceHover,
          paddingVertical: s.py,
          paddingHorizontal: s.px,
          borderRadius: theme.borderRadius.sm,
          alignItems: "center",
          justifyContent: "center",
          ...theme.elevation.level5,
        },
        label: {
          color: textColor,
          fontSize: s.fs,
          fontWeight: theme.fontWeight.medium as any,
        },
      };
      return acc;
    }, {} as Record<ButtonSize, ButtonStyle>);

  return {
    primary: build(theme.colors.primary, theme.colors.onPrimary),
    secondary: build(
      theme.colors.secondaryContainer,
      theme.colors.onSecondaryContainer
    ),
    danger: build(theme.colors.error, theme.colors.onError),
    outline: buildOutline(theme.colors.primary, theme.colors.primary),
    link: buildLink(theme.colors.primary),
    ghost: buildGhost(theme.colors.onSurface),
  };
};
