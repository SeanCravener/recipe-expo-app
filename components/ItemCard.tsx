import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { router } from "expo-router";
import { ItemSummary } from "../types/item";
import { MaterialIcons } from "@expo/vector-icons";

interface ItemCardProps {
  item: ItemSummary;
}

export function ItemCard({ item }: ItemCardProps) {
  return (
    <Pressable
      style={styles.container}
      onPress={() => router.push(`/items/${item.id}`)}
    >
      <Image
        source={{ uri: item.main_image }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>
        <View style={styles.details}>
          <Text style={styles.category}>{item.categories[0]}</Text>
          <Text style={styles.dot}> • </Text>
          <MaterialIcons name="star" size={16} color="#FFD700" />
          <Text style={styles.rating}>{item.average_rating.toFixed(1)}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 12,
    backgroundColor: "white",
    borderRadius: 8,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  content: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  details: {
    flexDirection: "row",
    alignItems: "center",
  },
  category: {
    fontSize: 14,
    color: "#666",
  },
  dot: {
    color: "#666",
  },
  rating: {
    fontSize: 14,
    marginLeft: 4,
    color: "#666",
  },
});
