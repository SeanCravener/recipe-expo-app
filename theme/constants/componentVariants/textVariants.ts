import { Theme } from "../../types/theme";
import { TextVariant } from "../../types/componentVariants";
import { TextStyle } from "react-native";

/**
 * Generates text styles from theme tokens.
 */
export const createTextVariants = (
  theme: Theme
): Record<TextVariant, TextStyle> => ({
  // Body XSmall variants
  bodyXSmallRegular: {
    color: theme.colors.onBackground,
    fontSize: theme.fontSize.xs,
    fontWeight: theme.fontWeight.regular as any,
    lineHeight: theme.lineHeight.bodyXSmallRegular,
  },
  bodyXSmallBold: {
    color: theme.colors.onBackground,
    fontSize: theme.fontSize.xs,
    fontWeight: theme.fontWeight.bold as any,
    lineHeight: theme.lineHeight.bodyXSmallBold,
  },

  // Body Small variants
  bodySmallRegular: {
    color: theme.colors.onBackground,
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.regular as any,
    lineHeight: theme.lineHeight.bodySmallRegular,
  },
  bodySmallMedium: {
    color: theme.colors.onBackground,
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.medium as any,
    lineHeight: theme.lineHeight.bodySmallMedium,
  },
  bodySmallBold: {
    color: theme.colors.onBackground,
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.bold as any,
    lineHeight: theme.lineHeight.bodySmallBold,
  },

  // Body Normal variants
  bodyNormalRegular: {
    color: theme.colors.onBackground,
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.regular as any,
    lineHeight: theme.lineHeight.bodyNormalRegular,
  },
  bodyNormalMedium: {
    color: theme.colors.onBackground,
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.medium as any,
    lineHeight: theme.lineHeight.bodyNormalMedium,
  },
  bodyNormalBold: {
    color: theme.colors.onBackground,
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.bold as any,
    lineHeight: theme.lineHeight.bodyNormalBold,
  },

  // Body Large variants
  bodyLargeRegular: {
    color: theme.colors.onBackground,
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.regular as any,
    lineHeight: theme.lineHeight.bodyLargeRegular,
  },
  bodyLargeMedium: {
    color: theme.colors.onBackground,
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.medium as any,
    lineHeight: theme.lineHeight.bodyLargeMedium,
  },

  // Body XLarge variants
  bodyXLargeRegular: {
    color: theme.colors.onBackground,
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.regular as any,
    lineHeight: theme.lineHeight.bodyXLargeRegular,
  },
  bodyXLargeBold: {
    color: theme.colors.onBackground,
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.bold as any,
    lineHeight: theme.lineHeight.bodyXLargeBold,
  },

  // Header variants
  headerOne: {
    color: theme.colors.onBackground,
    fontSize: theme.fontSize.headerOne,
    fontWeight: theme.fontWeight.bold as any,
    lineHeight: theme.lineHeight.headerOne,
  },
  headerTwo: {
    color: theme.colors.onBackground,
    fontSize: theme.fontSize.headerTwo,
    fontWeight: theme.fontWeight.bold as any,
    lineHeight: theme.lineHeight.headerTwo,
  },
  headerThree: {
    color: theme.colors.onBackground,
    fontSize: theme.fontSize.headerThree,
    fontWeight: theme.fontWeight.bold as any,
    lineHeight: theme.lineHeight.headerThree,
  },
});
