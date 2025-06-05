// theme/constants/componentVariants/avatarVariants.ts
import { Theme } from "../../types/theme";
import { AvatarVariant } from "../../types/componentVariants";
import { ImageStyle } from "react-native";

export const createAvatarVariants = (
  theme: Theme
): Record<AvatarVariant, ImageStyle> => ({
  sm: {
    width: theme.spacing.xl, // ~32
    height: theme.spacing.xl,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.surfaceVariant,
  },
  md: {
    width: theme.spacing.xxl, // ~48
    height: theme.spacing.xxl,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.surfaceVariant,
  },
  lg: {
    width: theme.spacing.xxl + theme.spacing.sm, // 48 + 8 = 56 (~60)
    height: theme.spacing.xxl + theme.spacing.sm,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.surfaceVariant,
  },
});
