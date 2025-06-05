// theme/constants/componentVariants/errorVariants.ts
import { Theme } from "../../types/theme";
import { ErrorVariant } from "../../types/componentVariants";
import { ViewStyle, TextStyle } from "react-native";

export interface ErrorStyle {
  container: ViewStyle;
  label: TextStyle;
}

export const createErrorVariants = (
  theme: Theme
): Record<ErrorVariant, ErrorStyle> => ({
  /** Simple red text – use inline without box */
  text: {
    container: {},
    label: {
      color: theme.colors.error,
      fontSize: theme.fontSize.sm,
    },
  },

  /** Boxed alert with contrasting label color */
  box: {
    container: {
      backgroundColor: theme.colors.errorContainer,
      padding: theme.spacing.sm,
      borderRadius: theme.borderRadius.sm,
    },
    label: {
      color: theme.colors.onErrorContainer,
      fontSize: theme.fontSize.sm,
    },
  },
});
