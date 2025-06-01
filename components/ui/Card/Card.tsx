import React from "react";
import {
  GestureResponderEvent,
  StyleProp,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { View } from "@/components/ui";

type ElevationKey = keyof ReturnType<typeof useTheme>["theme"]["elevation"];
type RadiusKey = keyof ReturnType<typeof useTheme>["theme"]["borderRadius"];
type SpacingKey = keyof ReturnType<typeof useTheme>["theme"]["spacing"];
type ColorKey = keyof ReturnType<typeof useTheme>["theme"]["colors"];

interface CardProps {
  children: React.ReactNode;
  padding?: SpacingKey;
  radius?: RadiusKey;
  elevation?: ElevationKey;
  backgroundColor?: ColorKey;
  style?: StyleProp<ViewStyle>;
  onPress?: (event: GestureResponderEvent) => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  padding = "md",
  radius = "lg",
  elevation = "level1",
  backgroundColor = "surfaceContainerLow",
  style,
  onPress,
}) => {
  const { theme } = useTheme();

  const innerStyle: ViewStyle = {
    borderRadius: theme.borderRadius[radius],
    backgroundColor: theme.colors[backgroundColor],
    padding: theme.spacing[padding],
    ...(elevation ? theme.elevation[elevation] : {}),
  };

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.85} style={[style]}>
        <View style={[innerStyle]}>{children}</View>
      </TouchableOpacity>
    );
  }

  return <View style={[innerStyle, style]}>{children}</View>;
};
