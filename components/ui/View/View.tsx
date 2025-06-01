import React from "react";
import {
  View as RNView,
  ViewProps as RNViewProps,
  StyleProp,
  ViewStyle,
} from "react-native";
import { useTheme } from "@/hooks/useTheme";

type SpacingKey = keyof ReturnType<typeof useTheme>["theme"]["spacing"];
type ColorKey = keyof ReturnType<typeof useTheme>["theme"]["colors"];
type RadiusKey = keyof ReturnType<typeof useTheme>["theme"]["borderRadius"];
type ElevationKey = keyof ReturnType<typeof useTheme>["theme"]["elevation"];
type ZIndexKey = keyof ReturnType<typeof useTheme>["theme"]["zIndex"];
type OpacityKey = keyof ReturnType<typeof useTheme>["theme"]["opacity"];

interface CustomViewProps extends RNViewProps {
  padding?: SpacingKey;
  margin?: SpacingKey;
  backgroundColor?: ColorKey;
  borderRadius?: RadiusKey;
  elevation?: ElevationKey;
  zIndex?: ZIndexKey;
  opacity?: OpacityKey;
  style?: StyleProp<ViewStyle>;
}

export const View: React.FC<CustomViewProps> = ({
  padding,
  margin,
  backgroundColor = "background",
  borderRadius,
  elevation = "level0",
  zIndex = "base",
  opacity = "full",
  style,
  children,
  ...rest
}) => {
  const { theme } = useTheme();

  const baseStyle: ViewStyle = {
    ...(padding && { padding: theme.spacing[padding] }),
    ...(margin && { margin: theme.spacing[margin] }),
    backgroundColor: theme.colors[backgroundColor],
    ...(borderRadius && { borderRadius: theme.borderRadius[borderRadius] }),
    ...(elevation && theme.elevation[elevation]),
    zIndex: theme.zIndex[zIndex],
    opacity: theme.opacity[opacity],
  };

  return (
    <RNView style={[baseStyle, style]} {...rest}>
      {children}
    </RNView>
  );
};
