import React from "react";
import { StyleProp, Switch, ViewStyle } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { Text, View } from "@/components/ui";

type ColorKey = keyof ReturnType<typeof useTheme>["theme"]["colors"];

interface ToggleProps {
  label?: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  color?: ColorKey;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

export const Toggle: React.FC<ToggleProps> = ({
  label,
  value,
  onValueChange,
  color = "primary",
  disabled = false,
  style,
}) => {
  const { theme } = useTheme();

  const thumbColor = disabled
    ? theme.colors.outline
    : value
    ? theme.colors[color]
    : theme.colors.surfaceVariant;

  const trackColor = {
    false: theme.colors.outlineVariant,
    true: theme.colors[color],
  };

  return (
    <View
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        },
        style,
      ]}
    >
      {label && (
        <Text variant="body" color="onSurface" style={{ marginRight: 12 }}>
          {label}
        </Text>
      )}
      <Switch
        value={value}
        onValueChange={onValueChange}
        thumbColor={thumbColor}
        trackColor={trackColor}
        disabled={disabled}
      />
    </View>
  );
};
