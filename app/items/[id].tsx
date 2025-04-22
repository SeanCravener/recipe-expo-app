import { View, ScrollView, Image, StyleSheet, Pressable } from "react-native";
import { useLocalSearchParams, router, Stack } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useItem } from "../../hooks/useItem";
import { useAuth } from "../../contexts/auth/AuthContext";
import { ItemHeader } from "../../components/ItemHeader";
import { IngredientsList } from "../../components/IngredientsList";
import { Share } from "react-native";

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
        // You might want to add a deep link URL here
      });
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  const handleStartRecipe = () => {
    router.push(`/items/${id}/instructions`);
  };

  if (isLoading || !item) {
    return null; // You might want to add a loading indicator here
  }

  const isOwner = session?.user.id === item.user_id;

  return (
    <>
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
      <View style={styles.container}>
        <ScrollView style={styles.content}>
          <Image
            source={{ uri: item.main_image }}
            style={styles.image}
            resizeMode="cover"
          />
          <View style={styles.details}>
            <ItemHeader
              title={item.title}
              categories={item.categories}
              averageRating={item.average_rating}
            />
            <View style={styles.section}>
              <Text style={styles.description}>{item.description}</Text>
            </View>
            <View style={styles.divider} />
            <IngredientsList ingredients={item.ingredients} />
          </View>
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
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
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
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#333",
  },
  divider: {
    height: 8,
    backgroundColor: "#f5f5f5",
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
});
