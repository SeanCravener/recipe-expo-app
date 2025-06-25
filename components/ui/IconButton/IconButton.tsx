import React from "react";
import { ViewStyle } from "react-native";
import { Button, ButtonProps } from "@/components/ui/Button/Button";
import {
  Icon,
  IconName,
  IconVariant,
  IconSize,
} from "@/components/ui/Icon/Icon";
import { ColorKey } from "@/theme/types/keys";

export interface IconButtonProps extends Omit<ButtonProps, "children"> {
  /** Icon name from your icon set */
  icon: IconName;
  /** Icon variant - if not provided, uses active state to determine filled/unfilled */
  iconVariant?: IconVariant;
  /** Icon size - defaults to button size mapping */
  iconSize?: IconSize | number;
  /** Icon color - if not provided, uses appropriate color based on button variant */
  iconColor?: ColorKey;
  /** Active state - determines filled/unfilled icon and can affect button styling */
  active?: boolean;
  /** Optional accessibility label */
  accessibilityLabel?: string;
}

// Map button sizes to appropriate icon sizes
const buttonSizeToIconSize: Record<
  NonNullable<ButtonProps["size"]>,
  IconSize
> = {
  sm: "sm", // 16px icon for small buttons
  md: "md", // 20px icon for medium buttons
  lg: "lg", // 24px icon for large buttons
};

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  iconVariant,
  iconSize,
  iconColor = "onBackground",
  active = false,
  variant = "ghost",
  size = "lg",
  style,
  accessibilityLabel,
  disabled,
  ...buttonProps
}) => {
  // Determine icon size based on button size if not explicitly provided
  const resolvedIconSize = iconSize || buttonSizeToIconSize[size || "md"];

  // Determine icon color based on button variant and state if not explicitly provided
  const getIconColor = React.useCallback((): ColorKey => {
    if (iconColor) return iconColor;

    // Color logic based on button variant and active state
    switch (variant) {
      case "primary":
        return "onPrimary";
      case "secondary":
        return "onSecondary";
      case "danger":
        return "onError";
      case "outline":
        return active ? "primary" : "onSurface";
      case "link":
        return "primary";
      case "ghost":
      default:
        return active ? "primary" : "onSurface";
    }
  }, [iconColor, variant, active]);

  // Enhanced style for icon buttons with better proportions
  const iconButtonStyle: ButtonProps["style"] = React.useMemo(() => {
    const baseStyle: ViewStyle = {
      // Ensure square aspect ratio for icon buttons
      aspectRatio: 1,
      // Minimum touch target size for accessibility (44px minimum)
      minWidth: 44,
      minHeight: 44,
      // Center the icon
      justifyContent: "center",
      alignItems: "center",
    };

    if (typeof style === "function") {
      return (state) => [baseStyle, style(state)];
    }

    return [baseStyle, style];
  }, [style]);

  return (
    <Button
      variant={variant}
      size={size}
      style={iconButtonStyle}
      compact={true} // Use compact padding for tighter fit around icons
      disabled={disabled}
      accessibilityLabel={accessibilityLabel || `${icon} button`}
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
      {...buttonProps}
    >
      <Icon
        name={icon}
        variant={iconVariant}
        size={resolvedIconSize}
        color={getIconColor()}
        active={active}
      />
    </Button>
  );
};
