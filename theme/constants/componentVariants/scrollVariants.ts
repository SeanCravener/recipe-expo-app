// theme/constants/componentVariants/scrollVariants.ts
import { Theme } from "../../types/theme";
import { ScrollVariant } from "../../types/componentVariants";
import { ViewStyle } from "react-native";

export const createScrollVariants = (
  theme: Theme
): Record<ScrollVariant, ViewStyle> => ({
  padded: {
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.lg,
  },
  flush: {
    padding: theme.spacing.none,
  },
  fullScreen: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing.md,
  },
});
