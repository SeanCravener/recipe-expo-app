import { Feather } from "@expo/vector-icons";
import React from "react";
import { StyleProp, TextStyle } from "react-native";
import { SvgProps } from "react-native-svg";
import { useTheme } from "../../../hooks/useTheme";

type ColorKey = keyof ReturnType<typeof useTheme>["theme"]["colors"];

interface BaseIconProps {
  size?: number;
  color?: ColorKey;
  style?: StyleProp<TextStyle>;
  onPress?: () => void;
}

interface FeatherIconProps extends BaseIconProps {
  name: keyof typeof Feather.glyphMap;
  Component?: never;
}

interface CustomIconProps extends BaseIconProps {
  Component: React.ComponentType<SvgProps & { size?: number; color?: string }>;
  name?: never;
}

type IconProps = FeatherIconProps | CustomIconProps;

export const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  color = "onSurface",
  style,
  onPress,
  Component,
}) => {
  const { theme } = useTheme();
  const tintColor = theme.colors[color];

  if (Component) {
    return <Component size={size} color={tintColor} style={style as any} />;
  }

  return <Feather name={name} size={size} color={tintColor} style={style} />;
};
