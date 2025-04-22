import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Rating } from "./Rating";

interface ItemHeaderProps {
  title: string;
  categories: string[];
  averageRating: number;
}

export function ItemHeader({
  title,
  categories,
  averageRating,
}: ItemHeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.ratingContainer}>
        <Rating value={averageRating} />
        <Text style={styles.rating}>{averageRating.toFixed(1)}</Text>
      </View>
      <View style={styles.categories}>
        {categories.map((category, index) => (
          <View key={category} style={styles.categoryContainer}>
            <Text style={styles.category}>{category}</Text>
            {index < categories.length - 1 && (
              <Text style={styles.dot}> • </Text>
            )}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  rating: {
    marginLeft: 4,
    fontSize: 16,
    color: "#666",
  },
  categories: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  categoryContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  category: {
    fontSize: 16,
    color: "#666",
  },
  dot: {
    marginHorizontal: 4,
    color: "#666",
  },
});
