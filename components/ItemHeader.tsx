import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import FavoriteButton from "../components/FavoriteButton";

interface ItemHeaderProps {
  title: string;
  category: string;
  averageRating: number | null;
}

export function ItemHeader({
  title,
  category,
  averageRating,
}: ItemHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>{title}</Text>
        <FavoriteButton itemId={title} size={20} />
      </View>
      <View style={styles.ratingContainer}>
        <MaterialIcons name="star" size={20} color="#FFD700" />
        <Text style={styles.rating}>{averageRating?.toFixed(1) || "N/A"}</Text>
      </View>
      <Text style={styles.category}>{category}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
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
