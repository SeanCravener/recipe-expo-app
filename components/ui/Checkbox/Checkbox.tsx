// components/base/Checkbox.tsx
import React from "react";
import { Pressable, StyleProp, TextStyle, ViewStyle } from "react-native";
import { useTheme } from "../../../hooks/useTheme";
import { Icon, Text, View } from "../index";

type ColorKey = keyof ReturnType<typeof useTheme>["theme"]["colors"];

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  color?: ColorKey;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  label,
  color = "primary",
  disabled = false,
  style,
  labelStyle,
}) => {
  const { theme } = useTheme();

  const borderColor = disabled
    ? theme.colors.outlineVariant
    : checked
    ? theme.colors[color]
    : theme.colors.outline;

  const backgroundColor = checked ? theme.colors[color] : theme.colors.surface;

  const handlePress = () => {
    if (!disabled) {
      onChange(!checked);
    }
  };

  return (
    <Pressable
      onPress={handlePress}
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
        },
        style,
      ]}
    >
      <View
        style={{
          width: 24,
          height: 24,
          borderRadius: theme.borderRadius.sm,
          borderWidth: 2,
          borderColor: borderColor,
          backgroundColor: backgroundColor,
          alignItems: "center",
          justifyContent: "center",
          marginRight: label ? theme.spacing.sm : 0,
        }}
      >
        {checked && (
          <Icon
            name="check"
            size={16}
            color="onPrimary"
            style={{ marginTop: 1 }}
          />
        )}
      </View>
      {label && (
        <Text variant="body" color="onSurface" style={labelStyle}>
          {label}
        </Text>
      )}
    </Pressable>
  );
};
