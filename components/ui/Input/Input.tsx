import React from "react";
import {
  TextInput,
  TextInputProps,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Pressable,
} from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { Text, Icon, View } from "@/components/ui";

type ColorKey = keyof ReturnType<typeof useTheme>["theme"]["colors"];

interface InputProps extends TextInputProps {
  label?: string;
  color?: ColorKey;
  containerStyle?: ViewStyle;
  style?: TextStyle;
  rightIcon?: string;
  onRightIconPress?: () => void;
}

export const Input: React.FC<InputProps> = ({
  label,
  color = "primary",
  containerStyle,
  style,
  rightIcon,
  onRightIconPress,
  ...rest
}) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text
          variant="label"
          color="onSurface"
          style={{ marginBottom: theme.spacing.xs }}
        >
          {label}
        </Text>
      )}
      <View
        backgroundColor={color}
        borderRadius="md"
        style={styles.inputWrapper}
      >
        <TextInput
          style={[
            styles.input,
            {
              color: theme.colors.onPrimary,
              fontSize: theme.typography.fontSize.md,
              fontFamily: theme.typography.fontFamily.regular,
            },
            style,
          ]}
          placeholderTextColor={theme.colors.onPrimary}
          {...rest}
        />
        {rightIcon && onRightIconPress && (
          <Pressable onPress={onRightIconPress} style={styles.iconContainer}>
            <Icon name={rightIcon} size={20} color="onPrimary" />
          </Pressable>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
  },
  iconContainer: {
    paddingLeft: 8,
  },
});
