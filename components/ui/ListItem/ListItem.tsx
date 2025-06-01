import { Feather } from "@expo/vector-icons";
import React from "react";
import { GestureResponderEvent, StyleProp, ViewStyle } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { Icon, Text, View } from "@/components/ui";

type ColorKey = keyof ReturnType<typeof useTheme>["theme"]["colors"];

interface ListItemProps {
  title: string;
  subtitle?: string;
  icon?: keyof typeof Feather.glyphMap;
  iconColor?: ColorKey;
  onPress?: (event: GestureResponderEvent) => void;
  right?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export const ListItem: React.FC<ListItemProps> = ({
  title,
  subtitle,
  icon,
  iconColor = "onSurface",
  onPress,
  right,
  style,
}) => {
  return (
    <View
      padding="md"
      backgroundColor="surface"
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottomWidth: 1,
          borderColor: "#eee",
        },
        style,
      ]}
    >
      <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
        {icon && (
          <Icon
            name={icon}
            color={iconColor}
            size={20}
            style={{ marginRight: 12 }}
          />
        )}
        <View style={{ flex: 1 }}>
          <Text
            variant="body"
            fontWeight="medium"
            color="onSurface"
            style={{ marginBottom: subtitle ? 2 : 0 }}
          >
            {title}
          </Text>
          {subtitle && (
            <Text variant="label" color="onSurfaceVariant">
              {subtitle}
            </Text>
          )}
        </View>
      </View>
      {right && <View>{right}</View>}
    </View>
  );
};
