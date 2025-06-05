import { Colors, Shades } from "./colors";
import { FontFamily, FontSize, FontWeight, LineHeight } from "./typography";
import { Spacing } from "./spacing";
import { BorderRadius } from "./borderRadius";
import { Elevation } from "./elevation";

export interface ThemeConfig {
  colors: Colors;
  shades: Shades;
  fontFamily: FontFamily;
  fontSize: FontSize;
  fontWeight: FontWeight;
  lineHeight: LineHeight;
  spacing: Spacing;
  borderRadius: BorderRadius;
  elevation: Elevation;
  components: import("./components").ComponentsMapping;
}
