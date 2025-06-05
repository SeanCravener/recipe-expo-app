import { Theme } from "../../types/theme";
import { ModalVariant } from "../../types/componentVariants";
import { ViewStyle, StyleSheet } from "react-native";

export interface ModalStyle {
  overlay: ViewStyle; // full-screen backdrop
  content: ViewStyle; // inner modal card
}

/**
 * Generates modal variants from theme tokens.
 * Variants defined in ModalVariant union: "default" | "fullscreen"
 */
export const createModalVariants = (
  theme: Theme
): Record<ModalVariant, ModalStyle> => ({
  /** Centered dialog with backdrop tint */
  default: {
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: theme.colors.backdrop,
      alignItems: "center",
      justifyContent: "center",
    },
    content: {
      width: "85%",
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.lg,
      padding: theme.spacing.lg,
      ...theme.elevation.level4,
    },
  },

  /** Edge-to-edge modal (good for drawers, sheets) */
  fullscreen: {
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: theme.colors.surface, // same as screen bg
    },
    content: {
      flex: 1,
      backgroundColor: theme.colors.surface,
      padding: theme.spacing.md,
    },
  },
});
