import React from "react";
import {
  Pressable,
  StyleProp,
  ViewStyle,
  TextStyle,
  PressableStateCallbackType,
} from "react-native";

import { useTheme } from "@/theme/hooks/useTheme";
import { ToggleTextVariant } from "@/theme/types/componentVariants";
import { View, Text } from "@/components/ui";

interface ToggleTextProps {
  variant?: ToggleTextVariant;
  active?: boolean;
  disabled?: boolean;
  onPress?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>; // Additional style prop for external styling
  accessibilityLabel?: string;
  // NEW: Selection mode props
  selectionMode?: "single" | "multiple"; // Controls visual styling
  children: React.ReactNode;
}

export const ToggleText: React.FC<ToggleTextProps> = ({
  variant = "underline",
  active = false,
  disabled = false,
  onPress,
  containerStyle,
  labelStyle,
  style,
  accessibilityLabel,
  selectionMode = "multiple", // Default to existing behavior
  children,
}) => {
  const { theme } = useTheme();
  const { container, label } = theme.components.toggleText[variant];

  // Enhanced styling with proper state management and selection modes
  const getContainerStyle = React.useCallback(
    (state: PressableStateCallbackType): ViewStyle => {
      const baseStyle: ViewStyle = {
        ...container,
        ...(disabled && {
          opacity: 0.5,
        }),
        ...(state.pressed &&
          !disabled && {
            opacity: 0.7,
            transform: [{ scale: 0.98 }],
          }),
      };

      // Apply selection mode specific styling for pill variant
      if (variant === "pill") {
        if (selectionMode === "single") {
          // Single selection: filled when active, outlined when inactive
          if (active) {
            baseStyle.backgroundColor = theme.colors.primary;
            baseStyle.borderColor = theme.colors.primary;
            baseStyle.borderWidth = 1;
          } else {
            baseStyle.backgroundColor = "transparent";
            baseStyle.borderColor = theme.colors.primary;
            baseStyle.borderWidth = 1;
          }
        } else {
          // Multiple selection: original behavior
          if (active) {
            baseStyle.backgroundColor = theme.colors.primaryContainer;
            baseStyle.borderColor = theme.colors.primary;
            baseStyle.borderWidth = 1;
          }
        }
      }

      return baseStyle;
    },
    [container, disabled, variant, theme.colors, active, selectionMode]
  );

  // Enhanced text styling with proper state management and selection modes
  const getTextStyle = React.useMemo((): TextStyle => {
    const baseStyle: TextStyle = {
      ...label,
      ...(disabled && {
        color: theme.colors.onSurfaceVariant,
      }),
    };

    // Apply selection mode specific text styling
    if (variant === "pill") {
      if (selectionMode === "single") {
        // Single selection: white text when active, primary text when inactive
        if (active) {
          baseStyle.color = theme.colors.onPrimary;
          baseStyle.fontWeight = "600";
        } else {
          baseStyle.color = theme.colors.primary;
        }
      } else {
        // Multiple selection: original behavior
        if (active) {
          baseStyle.color = theme.colors.onPrimaryContainer;
          baseStyle.fontWeight = "600";
        }
      }
    } else if (variant === "underline") {
      // Underline variant behavior (unchanged)
      if (active) {
        baseStyle.color = theme.colors.primary;
        baseStyle.fontWeight = "600";
        baseStyle.textDecorationLine = "underline";
        baseStyle.textDecorationColor = theme.colors.primary;
      }
    }

    return baseStyle;
  }, [label, active, disabled, variant, theme.colors, selectionMode]);

  // Enhanced container style combining all styles
  const enhancedContainerStyle = React.useCallback(
    (state: PressableStateCallbackType): StyleProp<ViewStyle> => {
      return [
        getContainerStyle(state),
        containerStyle,
        style, // External style prop
      ];
    },
    [getContainerStyle, containerStyle, style]
  );

  return (
    <Pressable
      onPress={disabled ? undefined : onPress}
      disabled={disabled}
      style={enhancedContainerStyle}
      accessibilityRole="button"
      accessibilityLabel={
        accessibilityLabel ||
        (typeof children === "string" ? children : "Toggle option")
      }
      accessibilityState={{
        disabled,
        selected: active,
      }}
      // Enhanced haptic feedback for better UX
      android_ripple={
        !disabled
          ? {
              color: theme.colors.primary,
              borderless: variant === "pill" ? false : true,
              radius: variant === "pill" ? undefined : 20,
            }
          : undefined
      }
    >
      {({ pressed }) => (
        <View>
          <Text style={[getTextStyle, labelStyle]}>{children}</Text>

          {/* Additional visual feedback for pressed state */}
          {pressed && !disabled && variant === "underline" && (
            <View
              style={{
                position: "absolute",
                bottom: -2,
                left: 0,
                right: 0,
                height: 2,
                backgroundColor: theme.colors.primary,
                opacity: 0.5,
              }}
            />
          )}
        </View>
      )}
    </Pressable>
  );
};
