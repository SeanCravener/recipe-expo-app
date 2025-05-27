import React from "react";
import { StyleProp, TextStyle, ViewStyle } from "react-native";
import { useTheme } from "../../../hooks/useTheme";
import { Text, View } from "../index";

interface ErrorProps {
  title?: string;
  message: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export const Error: React.FC<ErrorProps> = ({
  title,
  message,
  style,
  textStyle,
}) => {
  const { theme } = useTheme();

  return (
    <View
      backgroundColor="errorContainer"
      padding="md"
      borderRadius="md" // ✅ Changed here
      style={style}
    >
      {title && (
        <Text
          variant="title"
          fontWeight="bold"
          color="onErrorContainer"
          style={{ marginBottom: theme.spacing.xs }}
        >
          {title}
        </Text>
      )}
      <Text variant="body" color="onErrorContainer" style={textStyle}>
        {message}
      </Text>
    </View>
  );
};
