import { View, Pressable, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

interface RatingProps {
  value: number;
  size?: number;
  color?: string;
  interactive?: boolean;
  onChange?: (rating: number) => void;
}

export function Rating({
  value,
  size = 24,
  color = "#FFD700",
  interactive = false,
  onChange,
}: RatingProps) {
  return (
    <View style={styles.container}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Pressable
          key={star}
          onPress={() => interactive && onChange?.(star)}
          disabled={!interactive}
          style={({ pressed }) => [styles.star, pressed && styles.pressed]}
        >
          <MaterialIcons
            name={star <= value ? "star" : "star-border"}
            size={size}
            color={color}
          />
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  star: {
    padding: 2,
  },
  pressed: {
    opacity: 0.7,
  },
});
