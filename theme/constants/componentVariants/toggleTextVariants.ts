import { Theme } from "../../types/theme";
import { ToggleTextVariant } from "../../types/componentVariants";
import { ViewStyle, TextStyle } from "react-native";

export interface ToggleTextStyle {
  container: ViewStyle;
  label: TextStyle;
}

/**
 * Generates toggle-text variants from theme tokens.
 * Variants defined by ToggleTextVariant union: "pill" | "underline"
 */
export const createToggleTextVariants = (
  theme: Theme
): Record<ToggleTextVariant, ToggleTextStyle> => ({
  /** Chip-style pill with contrasting background */
  pill: {
    container: {
      backgroundColor: theme.colors.primaryContainer,
      borderRadius: theme.borderRadius.full,
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: theme.spacing.xs,
    },
    label: {
      color: theme.colors.onPrimaryContainer,
      fontSize: theme.fontSize.sm,
      fontWeight: theme.fontWeight.medium as any,
    },
  },

  /** Plain text with underline (no extra container) */
  underline: {
    container: {},
    label: {
      color: theme.colors.primary,
      textDecorationLine: "underline",
      fontSize: theme.fontSize.md,
      fontWeight: theme.fontWeight.medium as any,
    },
  },
});
