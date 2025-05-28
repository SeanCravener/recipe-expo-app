import React, { useRef, useEffect } from "react";
import { Animated, Pressable, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "@/hooks/useTheme";
import { View, Text } from "@/components/ui";

interface IngredientsDrawerProps {
  ingredients: string[];
  isOpen: boolean;
  onClose: () => void;
}

export const IngredientsDrawer: React.FC<IngredientsDrawerProps> = ({
  ingredients,
  isOpen,
  onClose,
}) => {
  const { theme } = useTheme();
  const slideAnim = useRef(new Animated.Value(300)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: isOpen ? 0 : 300,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <Pressable onPress={onClose} style={StyleSheet.absoluteFillObject}>
          <View
            style={{
              flex: 1,
              backgroundColor: theme.colors.background + "88",
              position: "absolute",
              width: "100%",
              height: "100%",
            }}
          />
        </Pressable>
      )}

      <Animated.View
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: 300,
          backgroundColor: theme.colors.surface,
          transform: [{ translateX: slideAnim }],
          shadowColor: "#000",
          shadowOffset: { width: -2, height: 0 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
          elevation: 5,
        }}
      >
        <View
          padding="md"
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottomWidth: 1,
            borderBottomColor: theme.colors.outlineVariant,
          }}
        >
          <Text variant="title" fontWeight="bold">
            Ingredients
          </Text>
          <Pressable onPress={onClose} style={{ padding: theme.spacing.xs }}>
            <MaterialIcons
              name="close"
              size={24}
              color={theme.colors.onSurfaceVariant}
            />
          </Pressable>
        </View>

        <View padding="md" style={{ flex: 1 }}>
          {ingredients.map((ingredient, index) => (
            <Text
              key={index}
              variant="body"
              color="onSurface"
              style={{
                marginBottom: theme.spacing.sm,
                lineHeight: theme.typography.lineHeight.loose,
              }}
            >
              • {ingredient}
            </Text>
          ))}
        </View>
      </Animated.View>
    </>
  );
};
