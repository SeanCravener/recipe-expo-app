import {
  Colors,
  ColorShades,
  FontFamily,
  FontSize,
  FontWeight,
  LineHeight,
  Spacing,
  BorderRadius,
  Elevation,
} from "@/theme/interfaces";

// Color keys //
export type ColorKey = keyof Colors;
export type ShadeKey = keyof ColorShades;

// Typography keys
export type FontFamilyKey = keyof FontFamily;
export type FontSizeKey = keyof FontSize;
export type FontWeightKey = keyof FontWeight;
export type LineHeightKey = keyof LineHeight;

// Spacing, border radius, elevation keys
export type SpacingKey = keyof Spacing;
export type BorderRadiusKey = keyof BorderRadius;
export type ElevationKey = keyof Elevation;
