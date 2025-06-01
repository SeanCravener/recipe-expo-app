import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, router, Stack } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useItem } from "../../hooks/useItem";
import { useAuth } from "../../contexts/auth/AuthContext";
import { Share } from "react-native";
import { Image } from "@/components/ui";
import { ItemDetails } from "@/components/composite";

export default function ItemDetail() {
  const { id } = useLocalSearchParams();
  const { data: item, isLoading } = useItem(id as string);
  const { session } = useAuth();

  const handleShare = async () => {
    if (!item) return;

    try {
      await Share.share({
        title: item.title,
        message: `Check out this recipe: ${item.title}`,
      });
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  const handleStartRecipe = () => {
    router.push(`/items/${id}/instructions`);
  };

  if (isLoading || !item) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  const isOwner = session?.user.id === item.user_id;

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: "",
          headerRight: isOwner
            ? () => (
                <Pressable
                  onPress={() => router.push(`/items/${id}/edit`)}
                  style={({ pressed }) => [
                    styles.headerButton,
                    pressed && styles.headerButtonPressed,
                  ]}
                >
                  <MaterialIcons name="edit" size={24} color="#007AFF" />
                </Pressable>
              )
            : undefined,
        }}
      />
      <ScrollView style={styles.content}>
        <Image
          source={{ uri: item.main_image }}
          style={styles.image}
          resizeMode="cover"
        />
        <ItemDetails
          id={item.id}
          title={item.title}
          category={item.category}
          rating={item.average_rating || 0}
          description={item.description}
          ingredients={item.ingredients || []}
        />
        {/* <View style={styles.details}>
          <ItemHeader
            id={item.id}
            title={item.title}
            category={item.category}
            rating={item.average_rating || 0}
          /> */}
        {/* <View style={styles.headerContainer}>
            <View style={styles.headerTop}>
              <Text style={styles.title}>{item.title}</Text>
              <FavoriteButton itemId={item.id} size={20} />
            </View>
            <RatingDisplay value={item.average_rating || 0} /> */}
        {/* <View style={styles.ratingContainer}>
              <MaterialIcons name="star" size={20} color="#FFD700" />
              <Text style={styles.rating}>
                {item.average_rating?.toFixed(1) || "N/A"}
              </Text>
            </View> */}
        {/* <Text style={styles.category}>{item.category}</Text>
          </View> */}
        {/* <View style={styles.section}>
            <Text style={styles.description}>{item.description}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ingredients</Text>
            {item.ingredients?.map((ingredient, index) => (
              <Text key={index} style={styles.ingredient}>
                • {ingredient}
              </Text>
            ))}
          </View>
        </View> */}
      </ScrollView>
      <View style={styles.footer}>
        <Pressable style={styles.startButton} onPress={handleStartRecipe}>
          <Text style={styles.startButtonText}>Start Recipe</Text>
        </Pressable>
        <Pressable style={styles.shareButton} onPress={handleShare}>
          <MaterialIcons name="share" size={24} color="#007AFF" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: 300,
  },
  details: {
    flex: 1,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#333",
  },
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  tag: {
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  tagText: {
    color: "#666",
  },
  divider: {
    height: 8,
    backgroundColor: "#f5f5f5",
  },
  ingredient: {
    fontSize: 16,
    marginBottom: 8,
    lineHeight: 24,
  },
  footer: {
    flexDirection: "row",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    backgroundColor: "white",
  },
  startButton: {
    flex: 1,
    backgroundColor: "#007AFF",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginRight: 12,
  },
  startButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  shareButton: {
    width: 50,
    aspectRatio: 1,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  headerButton: {
    padding: 8,
    marginRight: 8,
  },
  headerButtonPressed: {
    opacity: 0.7,
  },
  headerContainer: {
    padding: 16,
  },
  headerTop: {
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
