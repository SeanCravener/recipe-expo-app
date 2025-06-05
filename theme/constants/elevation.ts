// theme/constants/elevation.ts (REFACTORED)
// Elevation tokens now return ViewStyle fragments instead of plain strings
import { ViewStyle } from "react-native";
import { Elevation } from "@/theme/interfaces";

// Helper to create shadow presets (iOS + Android) in one place
const shadow = (
  elevation: number,
  opacity: number,
  radius: number,
  height: number
): ViewStyle => ({
  elevation, // Android
  shadowColor: "#000", // iOS shadow base
  shadowOpacity: opacity,
  shadowRadius: radius,
  shadowOffset: { width: 0, height },
});

export const elevation: Elevation = {
  level0: {},
  level1: shadow(1, 0.05, 2, 1),
  level2: shadow(2, 0.07, 4, 2),
  level3: shadow(4, 0.08, 8, 4),
  level4: shadow(8, 0.09, 16, 8),
  level5: shadow(12, 0.1, 24, 12),
};
