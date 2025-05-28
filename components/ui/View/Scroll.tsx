import React from "react";
import {
  ScrollView as RNScrollView,
  ScrollViewProps as RNScrollViewProps,
  StyleProp,
  ViewStyle,
} from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { Theme } from "@/theme/theme";

interface ScrollProps extends RNScrollViewProps {
  padding?: keyof Theme["spacing"];
  backgroundColor?: keyof Theme["colors"];
  radius?: keyof Theme["borderRadius"];
  style?: StyleProp<ViewStyle>;
}

export const Scroll: React.FC<ScrollProps> = ({
  children,
  padding,
  backgroundColor = "transparent",
  radius,
  style,
  ...props
}) => {
  const { theme } = useTheme();

  return (
    <RNScrollView
      {...props}
      contentContainerStyle={[
        {
          padding: padding ? theme.spacing[padding] : undefined,
          backgroundColor: theme.colors[backgroundColor],
          borderRadius: radius ? theme.borderRadius[radius] : undefined,
        },
        style,
      ]}
    >
      {children}
    </RNScrollView>
  );
};
