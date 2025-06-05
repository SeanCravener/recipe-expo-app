import React from "react";
import {
  TextInput,
  TextInputProps,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";

import { useTheme } from "@/theme/hooks/useTheme";
import { InputVariant } from "@/theme/types/componentVariants";
import { View } from "@/components/ui";

interface InputProps extends Omit<TextInputProps, "style"> {
  variant?: InputVariant; // "default" | "sm" | "lg"
  containerStyle?: StyleProp<ViewStyle>;
  fieldStyle?: StyleProp<TextStyle>;
}

export const Input: React.FC<InputProps> = ({
  variant = "default",
  containerStyle,
  fieldStyle,
  ...rest
}) => {
  const { theme } = useTheme();
  const { container, field } = theme.components.input[variant];

  return (
    <View style={[container, containerStyle]}>
      <TextInput style={[field, fieldStyle]} {...rest} />
    </View>
  );
};
