// theme/constants/componentVariants/viewVariants.ts
import { Theme } from "../../types/theme";
import { ViewVariant } from "../../types/componentVariants";
import { ViewStyle, StyleSheet } from "react-native";

export const createViewVariants = (
  theme: Theme
): Record<ViewVariant, ViewStyle> => ({
  default: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  padded: {
    padding: theme.spacing.lg,
  },
  "full-width": {
    width: "100%",
  },
  content: {
    padding: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
  },
  "card-rectangle": {
    width: "100%",
    height: 180,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    ...theme.elevation.level2,
  },
  "card-square": {
    width: 180,
    height: 180,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    ...theme.elevation.level2,
  },
  scrollable: {
    flexGrow: 1,
    padding: theme.spacing.md,
  },
  "absolute-fill": {
    ...StyleSheet.absoluteFillObject,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
});
