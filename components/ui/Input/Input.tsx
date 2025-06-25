import React, { forwardRef } from "react";
import {
  TextInput,
  TextInputProps,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";

import { useTheme } from "@/theme/hooks/useTheme";
import { InputVariant } from "@/theme/types/componentVariants";
import { View, Icon } from "@/components/ui";
import { IconName } from "@/components/ui/Icon/Icon";

interface InputProps extends Omit<TextInputProps, "style"> {
  variant?: InputVariant;
  containerStyle?: StyleProp<ViewStyle>;
  fieldStyle?: StyleProp<TextStyle>;
  error?: boolean;
  disabled?: boolean;
  leftIcon?: IconName;
  rightIcon?: IconName;
  onLeftIconPress?: () => void;
  onRightIconPress?: () => void;
}

export const Input = forwardRef<TextInput, InputProps>(
  (
    {
      variant = "default",
      containerStyle,
      fieldStyle,
      error = false,
      disabled = false,
      leftIcon,
      rightIcon,
      onLeftIconPress,
      onRightIconPress,
      ...rest
    },
    ref
  ) => {
    const { theme } = useTheme();
    const { container, field } = theme.components.input[variant];

    // Enhanced container style with proper state handling
    const enhancedContainerStyle: ViewStyle = {
      ...container,
      flexDirection: leftIcon || rightIcon ? "row" : undefined,
      alignItems: leftIcon || rightIcon ? "center" : undefined,
      ...(error && {
        borderColor: theme.colors.error,
        borderWidth: 1,
      }),
      ...(disabled && {
        opacity: 0.6,
        backgroundColor: theme.colors.surfaceVariant,
      }),
    };

    // Enhanced field style with proper conditional padding
    const enhancedFieldStyle: TextStyle = {
      ...field,
      flex: leftIcon || rightIcon ? 1 : undefined,
      ...(leftIcon && { marginLeft: theme.spacing.sm }),
      ...(rightIcon && { marginRight: theme.spacing.sm }),
      ...(disabled && {
        color: theme.colors.onSurfaceVariant,
      }),
    };

    return (
      <View style={[enhancedContainerStyle, containerStyle]}>
        {leftIcon && (
          <Icon
            name={leftIcon}
            size="md"
            color={disabled ? "onSurfaceVariant" : "onSurface"}
            onPress={onLeftIconPress}
            style={{ marginRight: theme.spacing.sm }}
          />
        )}
        <TextInput
          ref={ref}
          style={[enhancedFieldStyle, fieldStyle]}
          editable={!disabled}
          placeholderTextColor={theme.colors.onSurfaceVariant}
          {...rest}
        />
        {rightIcon && (
          <Icon
            name={rightIcon}
            size="md"
            color={disabled ? "onSurfaceVariant" : "onSurface"}
            onPress={onRightIconPress}
            style={{ marginLeft: theme.spacing.sm }}
          />
        )}
      </View>
    );
  }
);

Input.displayName = "Input";
