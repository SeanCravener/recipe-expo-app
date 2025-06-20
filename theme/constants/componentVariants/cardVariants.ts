// theme/constants/componentVariants/cardVariants.ts
import { Theme } from "../../types/theme";
import { CardVariant } from "../../types/componentVariants";
import { ViewStyle } from "react-native";

export const createCardVariants = (
  theme: Theme
): Record<CardVariant, ViewStyle> => ({
  /** Solid surface card */
  filled: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
  },

  /** Transparent background with outline */
  outlined: {
    backgroundColor: "transparent",
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.outline,
    ...theme.elevation.card,
  },

  /** Elevated filled card */
  elevated: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.primaryContainer,
    ...theme.elevation.card, // uses the new ViewStyle object
  },
});
