// theme/constants/elevation.ts (REFACTORED)
// Elevation tokens now return ViewStyle fragments instead of plain strings
import { ViewStyle } from "react-native";
import { Elevation } from "@/theme/interfaces";
import { lightColors } from "./colors";
// Helper to create shadow presets (iOS + Android) in one place
const shadow = (
  elevation: number,
  opacity: number,
  radius: number,
  width: number,
  height: number
): ViewStyle => ({
  elevation, // Android
  shadowColor: "#5A797B", // iOS shadow base
  shadowOpacity: opacity,
  shadowRadius: radius,
  shadowOffset: { width, height },
});

const cardShadow = lightColors.primaryContainer;

export const elevation: Elevation = {
  level0: {},
  level1: shadow(1, 0.05, 2, 0, 1),
  level2: shadow(2, 0.07, 4, 0, 2),
  level3: shadow(4, 0.08, 8, 0, 4),
  level4: shadow(8, 0.09, 16, 0, 8),
  level5: shadow(12, 0.1, 24, 0, 12),
  card: shadow(4, 0.25, 8, 0, 4),
};
