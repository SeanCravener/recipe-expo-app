import {
  lightColors,
  darkColors,
  elevation,
  spacing,
  borderRadius,
  fontFamily,
  fontSize,
  fontWeight,
  shades,
  lineHeight,
} from "@/theme/constants";
import { ThemeStructure } from "@/theme/types";

// Theme configuration for light and dark modes
export const theme: ThemeStructure = {
  light: {
    colors: lightColors,
    fontFamily,
    fontSize,
    fontWeight,
    lineHeight,
    shades,
    spacing,
    borderRadius,
    elevation,
  },
  dark: {
    colors: darkColors,
    fontFamily,
    fontSize,
    fontWeight,
    lineHeight,
    shades,
    spacing,
    borderRadius,
    elevation,
  },
};
