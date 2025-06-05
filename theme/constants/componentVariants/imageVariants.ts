// theme/constants/componentVariants/imageVariants.ts
import { Theme } from "../../types/theme";
import { ImageVariant } from "../../types/componentVariants";
import { ImageStyle } from "react-native";

export const createImageVariants = (
  theme: Theme
): Record<ImageVariant, ImageStyle> => ({
  /** Small square thumbnail with slight rounding */
  thumbnail: {
    width: theme.spacing.xxl, // 48
    height: theme.spacing.xxl,
    borderRadius: theme.borderRadius.sm,
    resizeMode: "cover",
  },

  /** Cover image fills parent bounds */
  cover: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  /** Contain image fits inside parent without cropping */
  contain: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});
