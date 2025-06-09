import React, { useRef, useEffect } from "react";
import { Animated, Pressable, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "@/theme/hooks/useTheme";
import { View, Text, Button } from "@/components/ui";
import { Ingredient } from "@/types/item";

interface IngredientsDrawerProps {
  ingredients: Ingredient[];
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

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <Pressable onPress={onClose} style={StyleSheet.absoluteFillObject}>
        <View
          style={{
            flex: 1,
            backgroundColor: theme.colors.backdrop,
            position: "absolute",
            width: "100%",
            height: "100%",
          }}
        />
      </Pressable>

      {/* Drawer */}
      <Animated.View
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: 300,
          backgroundColor: theme.colors.surface,
          transform: [{ translateX: slideAnim }],
          ...theme.elevation.level4,
        }}
      >
        {/* Header */}
        <View
          variant="row"
          padding="md"
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            borderBottomWidth: 1,
            borderBottomColor: theme.colors.outline,
          }}
        >
          <Text variant="bodyNormalBold">
            Ingredients ({ingredients.length})
          </Text>

          <Button
            variant="ghost"
            size="sm"
            onPress={onClose}
            style={{ minWidth: 40, minHeight: 40 }}
          >
            <MaterialIcons
              name="close"
              size={24}
              color={theme.colors.onSurfaceVariant}
            />
          </Button>
        </View>

        {/* Content */}
        <View padding="md" style={{ flex: 1 }}>
          <View style={{ gap: 8 }}>
            {ingredients.map((ingredient, index) => (
              <Text key={index} variant="bodyNormalRegular" color="onSurface">
                • {ingredient.value}
              </Text>
            ))}
          </View>
        </View>
      </Animated.View>
    </>
  );
};
