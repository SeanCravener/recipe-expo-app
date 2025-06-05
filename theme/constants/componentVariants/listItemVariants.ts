import { Theme } from "../../types/theme";
import { ListItemVariant } from "../../types/componentVariants";
import { ViewStyle, TextStyle } from "react-native";

export interface ListItemStyle {
  container: ViewStyle;
  title: TextStyle;
  subtitle: TextStyle;
}

export const createListItemVariants = (
  theme: Theme
): Record<ListItemVariant, ListItemStyle> => ({
  /** Standard list item */
  default: {
    container: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: theme.spacing.sm,
      paddingHorizontal: theme.spacing.md,
      backgroundColor: theme.colors.surface,
      borderBottomWidth: 1,
      borderColor: theme.colors.surfaceVariant,
    },
    title: {
      color: theme.colors.onSurface,
      fontSize: theme.fontSize.md,
      fontWeight: theme.fontWeight.medium as any,
    },
    subtitle: {
      color: theme.colors.onSurfaceVariant,
      fontSize: theme.fontSize.sm,
    },
  },

  /** Inset (indented) list item — useful for nested lists */
  inset: {
    container: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: theme.spacing.sm,
      paddingHorizontal: theme.spacing.lg, // extra indent
      backgroundColor: theme.colors.surface,
      borderBottomWidth: 1,
      borderColor: theme.colors.surfaceVariant,
    },
    title: {
      color: theme.colors.onSurface,
      fontSize: theme.fontSize.md,
      fontWeight: theme.fontWeight.medium as any,
    },
    subtitle: {
      color: theme.colors.onSurfaceVariant,
      fontSize: theme.fontSize.sm,
    },
  },
});
