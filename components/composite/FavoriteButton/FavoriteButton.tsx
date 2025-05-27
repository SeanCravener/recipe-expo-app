// components/composites/FavoriteButton.tsx
import React, { useState } from "react";
import { Animated, Pressable, StyleProp, ViewStyle } from "react-native";
import { useTheme } from "../../../hooks/useTheme";
import { Icon } from "../../ui/index";

type ColorKey = keyof ReturnType<typeof useTheme>["theme"]["colors"];

interface FavoriteButtonProps {
  isFavorite?: boolean;
  onToggle?: (favorited: boolean) => void;
  iconFilled?: React.ReactNode;
  iconOutline?: React.ReactNode;
  color?: ColorKey;
  size?: number;
  style?: StyleProp<ViewStyle>;
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  isFavorite: isFavoriteProp,
  onToggle,
  iconFilled,
  iconOutline,
  color = "primary",
  size = 24,
  style,
}) => {
  const { theme } = useTheme();
  const [isFavorite, setIsFavorite] = useState(isFavoriteProp ?? false);
  const [scale] = useState(new Animated.Value(1));

  const handleToggle = () => {
    const newValue = !isFavorite;
    setIsFavorite(newValue);
    onToggle?.(newValue);

    // simple scale animation for feedback
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 0.85,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const filled = iconFilled ?? <Icon name="heart" color={color} size={size} />;

  const outline = iconOutline ?? (
    <Icon name="heart" color="onSurfaceVariant" size={size} />
  );

  return (
    <Pressable onPress={handleToggle} style={style}>
      <Animated.View style={{ transform: [{ scale }] }}>
        {isFavorite ? filled : outline}
      </Animated.View>
    </Pressable>
  );
};
