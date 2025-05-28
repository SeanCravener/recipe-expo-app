import React from "react";
import {
  ImageStyle,
  Image as RNImage,
  ImageProps as RNImageProps,
  StyleProp,
} from "react-native";
import { useTheme } from "../../../hooks/useTheme";

type RadiusKey = keyof ReturnType<typeof useTheme>["theme"]["borderRadius"];
type ElevationKey = keyof ReturnType<typeof useTheme>["theme"]["elevation"];
type ColorKey = keyof ReturnType<typeof useTheme>["theme"]["colors"];
type OpacityKey = keyof ReturnType<typeof useTheme>["theme"]["opacity"];

interface CustomImageProps extends RNImageProps {
  radius?: RadiusKey;
  elevation?: ElevationKey;
  opacity?: OpacityKey;
  backgroundColor?: ColorKey;
  style?: StyleProp<ImageStyle>; // ✅ Fixed type here
}

export const Image: React.FC<CustomImageProps> = ({
  radius = "none",
  elevation = "level0",
  opacity = "full",
  backgroundColor = "transparent",
  style,
  ...rest
}) => {
  const { theme } = useTheme();

  const themedStyle: ImageStyle = {
    borderRadius: theme.borderRadius[radius],
    backgroundColor: theme.colors[backgroundColor],
    opacity: theme.opacity[opacity],
    ...theme.elevation[elevation],
    overflow: "hidden",
  };

  return <RNImage style={[themedStyle, style]} {...rest} />;
};
