import { Theme } from "../../types/theme";
import { InputVariant } from "../../types/componentVariants";
import { ViewStyle, TextStyle } from "react-native";

export interface InputStyle {
  container: ViewStyle; // wrapper (e.g., View around TextInput)
  field: TextStyle; // TextInput style itself
}

/**
 * Generates all input variants from the theme.
 * Variants: default | sm | lg  (defined in InputVariant union)
 */
export const createInputVariants = (
  theme: Theme
): Record<InputVariant, InputStyle> => {
  /** Size presets driven by spacing + fontSize */
  const preset = (py: number, px: number, fs: number): InputStyle => ({
    container: {
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1,
      borderRadius: theme.borderRadius.sm,
      borderColor: theme.colors.outline,
      backgroundColor: theme.colors.surface,
      paddingVertical: py,
      paddingHorizontal: px,
    },
    field: {
      flex: 1,
      color: theme.colors.onSurface,
      fontSize: fs,
      padding: 0, // let container handle padding
    },
  });

  return {
    default: preset(
      theme.spacing.sm, // paddingVertical
      theme.spacing.md, // paddingHorizontal
      theme.fontSize.md // fontSize
    ),

    sm: preset(theme.spacing.xs, theme.spacing.sm, theme.fontSize.sm),

    lg: preset(theme.spacing.md, theme.spacing.lg, theme.fontSize.lg),
  };
};
