import { Feather } from "@expo/vector-icons";
import React from "react";
import {
  GestureResponderEvent,
  StyleProp,
  ViewStyle,
  TextStyle,
  Pressable,
} from "react-native";
import { SvgProps } from "react-native-svg";
import { useTheme } from "@/hooks/useTheme";

type ColorKey = keyof ReturnType<typeof useTheme>["theme"]["colors"];

interface BaseIconProps {
  size?: number;
  color?: ColorKey;
  style?: StyleProp<TextStyle>;
  onPress?: (event: GestureResponderEvent) => void;
}

interface FeatherIconProps extends BaseIconProps {
  name: string;
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

  const iconElement = Component ? (
    <Component size={size} color={tintColor} style={style as any} />
  ) : (
    <Feather
      name={name as keyof typeof Feather.glyphMap}
      size={size}
      color={tintColor}
      style={style}
    />
  );

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        hitSlop={8}
        style={style as StyleProp<ViewStyle>}
      >
        {iconElement}
      </Pressable>
    );
  }

  return iconElement;
};
