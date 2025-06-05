import { Theme } from "../../types/theme";
import { CheckboxVariant } from "../../types/componentVariants";
import { ViewStyle } from "react-native";

export const createCheckboxVariants = (
  theme: Theme
): Record<CheckboxVariant, ViewStyle> => ({
  /** Default 20 × 20 box with theme outline */
  default: {
    width: theme.spacing.md, // 16
    height: theme.spacing.md,
    borderWidth: 1,
    borderRadius: theme.borderRadius.xs,
    borderColor: theme.colors.outline,
    backgroundColor: theme.colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },

  /** Small 16 × 16 box */
  sm: {
    width: theme.spacing.sm, // 8
    height: theme.spacing.sm,
    borderWidth: 1,
    borderRadius: theme.borderRadius.xs,
    borderColor: theme.colors.outline,
    backgroundColor: theme.colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },

  /** Large 28 × 28 box */
  lg: {
    width: theme.spacing.lg + theme.spacing.xs, // 24+4 = 28
    height: theme.spacing.lg + theme.spacing.xs,
    borderWidth: 1,
    borderRadius: theme.borderRadius.sm,
    borderColor: theme.colors.outline,
    backgroundColor: theme.colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },
});
