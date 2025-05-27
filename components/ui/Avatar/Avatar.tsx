import React from "react";
import {
  ImageSourcePropType,
  StyleProp,
  TextStyle,
  ViewStyle,
} from "react-native";
import { useTheme } from "../../../hooks/useTheme";
import { Image, Text, View } from "../index";

type Size = "sm" | "md" | "lg" | "xl";
type ColorKey = keyof ReturnType<typeof useTheme>["theme"]["colors"];

interface AvatarProps {
  size?: Size;
  source?: ImageSourcePropType;
  label?: string;
  backgroundColor?: ColorKey;
  textColor?: ColorKey;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export const Avatar: React.FC<AvatarProps> = ({
  size = "md",
  source,
  label,
  backgroundColor = "primary",
  textColor = "onPrimary",
  style,
  textStyle,
}) => {
  const { theme } = useTheme();

  const sizeMap: Record<Size, number> = {
    sm: 32,
    md: 48,
    lg: 64,
    xl: 80,
  };

  const avatarSize = sizeMap[size];

  return (
    <View
      backgroundColor={source ? undefined : backgroundColor}
      style={[
        {
          width: avatarSize,
          height: avatarSize,
          borderRadius: theme.borderRadius.round,
          overflow: "hidden",
          alignItems: "center",
          justifyContent: "center",
        },
        style,
      ]}
    >
      {source ? (
        <Image
          source={source}
          radius="round"
          style={{
            width: avatarSize,
            height: avatarSize,
          }}
        />
      ) : (
        <Text
          color={textColor}
          fontWeight="medium"
          style={[
            {
              fontSize: avatarSize / 2.5,
            },
            textStyle,
          ]}
        >
          {label}
        </Text>
      )}
    </View>
  );
};
