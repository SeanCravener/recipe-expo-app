// theme/config/theme.ts
import {
  lightColors,
  darkColors,
  elevation,
  spacing,
  borderRadius,
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  shades,
} from "@/theme/constants";

import { ThemeStructure } from "@/theme/types";

// ─── Variant creators ──────────────────────────────────────────────────────────
import { createViewVariants } from "@/theme/constants/componentVariants/viewVariants";
import { createScrollVariants } from "@/theme/constants/componentVariants/scrollVariants";
import { createAvatarVariants } from "@/theme/constants/componentVariants/avatarVariants";
import { createBadgeVariants } from "@/theme/constants/componentVariants/badgeVariants";
import { createButtonVariants } from "@/theme/constants/componentVariants/buttonVariants";
import { createCardVariants } from "@/theme/constants/componentVariants/cardVariants";
import { createCheckboxVariants } from "@/theme/constants/componentVariants/checkboxVariants";
import { createErrorVariants } from "@/theme/constants/componentVariants/errorVariants";
import { createImageVariants } from "@/theme/constants/componentVariants/imageVariants";
import { createInputVariants } from "@/theme/constants/componentVariants/inputVariants";
import { createListItemVariants } from "@/theme/constants/componentVariants/listItemVariants";
import { createLoadingVariants } from "@/theme/constants/componentVariants/loadingVariants";
import { createModalVariants } from "@/theme/constants/componentVariants/modalVariants";
import { createTextVariants } from "@/theme/constants/componentVariants/textVariants";
import { createToggleTextVariants } from "@/theme/constants/componentVariants/toggleTextVariants";

// ─── Helper to build the components map from a theme config ───────────────────
const buildComponents = (cfg: any) => ({
  view: createViewVariants(cfg),
  scroll: createScrollVariants(cfg),
  avatar: createAvatarVariants(cfg),
  badge: createBadgeVariants(cfg),
  button: createButtonVariants(cfg),
  card: createCardVariants(cfg),
  checkbox: createCheckboxVariants(cfg),
  error: createErrorVariants(cfg),
  image: createImageVariants(cfg),
  input: createInputVariants(cfg),
  listItem: createListItemVariants(cfg),
  loading: createLoadingVariants(cfg),
  modal: createModalVariants(cfg),
  text: createTextVariants(cfg),
  toggleText: createToggleTextVariants(cfg),
});

// ─── Light & dark theme objects ────────────────────────────────────────────────
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
    components: buildComponents({
      colors: lightColors,
      fontFamily,
      fontSize,
      fontWeight,
      lineHeight,
      shades,
      spacing,
      borderRadius,
      elevation,
    }),
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
    components: buildComponents({
      colors: darkColors,
      fontFamily,
      fontSize,
      fontWeight,
      lineHeight,
      shades,
      spacing,
      borderRadius,
      elevation,
    }),
  },
};
