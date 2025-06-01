import React from "react";
import { ActivityIndicator, StyleProp, ViewStyle } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { View } from "@/components/ui";

type ColorKey = keyof ReturnType<typeof useTheme>["theme"]["colors"];

interface LoadingProps {
  color?: ColorKey;
  size?: number | "small" | "large";
  fullScreen?: boolean;
  style?: StyleProp<ViewStyle>;
}

export const Loading: React.FC<LoadingProps> = ({
  color = "primary",
  size = "large",
  fullScreen = false,
  style,
}) => {
  const { theme } = useTheme();

  if (fullScreen) {
    return (
      <View
        backgroundColor="background"
        style={[
          {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          },
          style,
        ]}
      >
        <ActivityIndicator size={size} color={theme.colors[color]} />
      </View>
    );
  }

  return (
    <ActivityIndicator size={size} color={theme.colors[color]} style={style} />
  );
};
