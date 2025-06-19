import React from "react";
import { ImageSourcePropType } from "react-native";

import { useTheme } from "@/theme/hooks/useTheme";
import { AvatarVariant } from "@/theme/types/componentVariants";

import { Image, View, Text } from "@/components/ui";

interface AvatarProps {
  variant?: AvatarVariant; // "sm" | "md" | "lg"
  source?: ImageSourcePropType; // optional picture
  initials?: string; // fallback initials
  style?: any; // extra style overrides
}

export const Avatar: React.FC<AvatarProps> = ({
  variant = "md",
  source,
  initials = "sc",
  style,
}) => {
  const { theme } = useTheme();
  const baseStyle = theme.components.avatar[variant];

  if (source) {
    // Image branch (baseStyle is ImageStyle)
    return (
      <Image source={source} style={[baseStyle, style]} variant="contain" />
    );
  }

  // Fallback View branch needs a ViewStyle
  const viewStyle = {
    ...baseStyle,
    alignItems: "center",
    justifyContent: "center",
  } as const;

  return (
    <View style={[viewStyle, style]}>
      {initials && (
        <Text
          style={{
            color: theme.colors.onSurface,
            fontSize: theme.fontSize.sm,
            fontWeight: theme.fontWeight.bold as any,
          }}
        >
          {initials}
        </Text>
      )}
    </View>
  );
};
