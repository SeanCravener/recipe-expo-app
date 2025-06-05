import { Theme } from "../../types/theme";
import { TextVariant } from "../../types/componentVariants";
import { TextStyle } from "react-native";

/**
 * Generates text styles from theme tokens.
 * Variants defined by TextVariant union: "heading" | "body" | "caption"
 */
export const createTextVariants = (
  theme: Theme
): Record<TextVariant, TextStyle> => ({
  /** Large bold heading */
  heading: {
    color: theme.colors.onBackground,
    fontSize: theme.fontSize.headerThree, // 24 px token
    fontWeight: theme.fontWeight.bold as any,
  },

  /** Regular body copy */
  body: {
    color: theme.colors.onBackground,
    fontSize: theme.fontSize.md, // 16 px token
    fontWeight: theme.fontWeight.regular as any,
  },

  /** Small caption / hint text */
  caption: {
    color: theme.colors.onSurfaceVariant,
    fontSize: theme.fontSize.xs, // 12 px token
    fontWeight: theme.fontWeight.regular as any,
  },
});
