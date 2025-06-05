import React from "react";
import {
  StyleProp,
  ViewStyle,
  TextStyle,
  ImageSourcePropType,
} from "react-native";

import { useTheme } from "@/theme/hooks/useTheme";
import { ListItemVariant } from "@/theme/types/componentVariants";

import { View, Image, Text } from "@/components/ui";

interface ListItemProps {
  variant?: ListItemVariant; // "default" | "inset"
  title: string;
  subtitle?: string;
  leftIcon?: ImageSourcePropType;
  /** Optional trailing element (e.g., delete icon) */
  rightElement?: React.ReactNode;

  containerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  subtitleStyle?: StyleProp<TextStyle>;
}

export const ListItem: React.FC<ListItemProps> = ({
  variant = "default",
  title,
  subtitle,
  leftIcon,
  rightElement,
  containerStyle,
  titleStyle,
  subtitleStyle,
}) => {
  const { theme } = useTheme();
  const {
    container,
    title: titleDS,
    subtitle: subtitleDS,
  } = theme.components.listItem[variant];

  return (
    <View
      variant="row"
      style={[container, containerStyle, { paddingRight: theme.spacing.md }]}
    >
      {leftIcon && (
        <Image
          source={leftIcon}
          variant="thumbnail"
          style={{ marginRight: theme.spacing.sm }}
        />
      )}

      <View style={{ flex: 1 }}>
        <Text style={[titleDS, titleStyle]}>{title}</Text>
        {subtitle && (
          <Text style={[subtitleDS, subtitleStyle]}>{subtitle}</Text>
        )}
      </View>

      {rightElement}
    </View>
  );
};
