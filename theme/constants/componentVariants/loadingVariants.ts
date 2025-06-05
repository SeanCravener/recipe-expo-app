import { Theme } from "../../types/theme";
import { LoadingVariant } from "../../types/componentVariants";
import { ViewStyle, StyleSheet } from "react-native"; // ← include StyleSheet

export const createLoadingVariants = (
  theme: Theme
): Record<LoadingVariant, ViewStyle> => ({
  /** Plain spinner wrapper */
  spinner: {
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing.md,
  },

  /** Full-screen overlay with backdrop tint */
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: theme.colors.backdrop,
    alignItems: "center",
    justifyContent: "center",
  },
});
