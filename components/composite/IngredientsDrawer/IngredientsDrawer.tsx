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
      useNativeDriver: false,
    }).start();
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <Pressable
        onPress={onClose}
        style={[
          StyleSheet.absoluteFillObject,
          {
            zIndex: 9998,
            backgroundColor: theme.colors.backdrop,
          },
        ]}
      />

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
          zIndex: 9999,
          ...theme.elevation.level4,
        }}
      >
        {/* Header */}
        <View
          variant="row"
          padding="md"
          style={{
            justifyContent: "space-between",
          }}
        >
          <Text variant="bodyNormalBold" style={{ alignItems: "baseline" }}>
            Ingredients
          </Text>
          <Button
            variant="primary"
            size="sm"
            onPress={onClose}
            style={{ minWidth: 44, minHeight: 44 }}
          >
            <MaterialIcons
              name="close"
              size={24}
              color={theme.colors.onPrimary}
            />
          </Button>
        </View>

        {/* Divider (TURN INTO SEPERATE UI COMPONENT LATER) */}
        <View
          style={{
            borderRadius: 8,
            borderWidth: 1,
            marginHorizontal: 25,
            borderColor: "#CFE8E9", // Fix later, change to constant. Pull from theme?
          }}
        ></View>

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
