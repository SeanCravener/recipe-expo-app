// theme/constants/componentVariants/badgeVariants.ts
import { Theme } from "../../types/theme";
import { BadgeVariant } from "../../types/componentVariants";
import { ViewStyle, TextStyle } from "react-native";

export interface BadgeStyle {
  container: ViewStyle;
  label: TextStyle;
}

export const createBadgeVariants = (
  theme: Theme
): Record<BadgeVariant, BadgeStyle> => {
  const baseContainer: ViewStyle = {
    borderRadius: theme.borderRadius.full,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    alignItems: "center",
    justifyContent: "center",
  };

  const build = (bg: string, fg: string): BadgeStyle => ({
    container: { ...baseContainer, backgroundColor: bg },
    label: {
      color: fg,
      fontSize: theme.fontSize.xs,
      fontWeight: theme.fontWeight.bold as any,
    },
  });

  return {
    primary: build(theme.colors.primary, theme.colors.onPrimary),
    success: build(theme.colors.success, theme.colors.onSuccess),
    warning: build(theme.colors.warning, theme.colors.onWarning),
    danger: build(theme.colors.error, theme.colors.onError),
  };
};
