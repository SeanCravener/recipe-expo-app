import React from "react";
import { Share } from "react-native";
import { useLocalSearchParams, router, Stack } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useItem } from "@/hooks/useItem";
import { useAuth } from "@/contexts/auth/AuthContext";
import { useTheme } from "@/theme/hooks/useTheme";
import { View, Image, Button, Loading, Scroll } from "@/components/ui";
import { ItemDetails } from "@/components/composite";

export default function ItemDetail() {
  const { id } = useLocalSearchParams();
  const { data: item, isLoading } = useItem(id as string);
  const { session } = useAuth();
  const { theme } = useTheme();

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

  const handleExit = () => {
    router.back();
  };

  const isOwner = session?.user.id === item?.user_id;

  if (isLoading || !item) {
    return (
      <View variant="centered" style={{ flex: 1 }}>
        <Loading variant="spinner" />
      </View>
    );
  }

  return (
    <View variant="default" backgroundColor="background">
      <Stack.Screen
        options={{
          headerTitle: "",
          headerStyle: {
            backgroundColor: theme.colors.surface,
          },
          headerTintColor: theme.colors.onSurface,
          headerRight: isOwner
            ? () => (
                <Button
                  variant="ghost"
                  size="sm"
                  onPress={() => router.push(`/items/${id}/edit`)}
                  style={{ marginRight: 8 }}
                >
                  <MaterialIcons
                    name="edit"
                    size={24}
                    color={theme.colors.primary}
                  />
                </Button>
              )
            : undefined,
          headerLeft: () => (
            <Button
              variant="ghost"
              size="sm"
              onPress={handleExit}
              style={{ marginLeft: 8 }}
            >
              <MaterialIcons
                name="arrow-back"
                size={24}
                color={theme.colors.onSurface}
              />
            </Button>
          ),
        }}
      />

      <Scroll variant="flush" style={{ flex: 1 }}>
        <Image
          source={{ uri: item.main_image }}
          variant="cover"
          style={{
            width: "100%",
            height: 300,
          }}
        />

        <ItemDetails
          id={item.id}
          title={item.title}
          category={item.category}
          rating={item.average_rating || 0}
          description={item.description}
          ingredients={(item.ingredients || []).map((ingredient) =>
            typeof ingredient === "string" ? { value: ingredient } : ingredient
          )}
        />
      </Scroll>

      {/* Footer with action buttons */}
      <View
        variant="row"
        padding="md"
        backgroundColor="surface"
        style={{
          borderTopWidth: 1,
          borderTopColor: theme.colors.outline,
          gap: 12,
        }}
      >
        <Button
          variant="primary"
          size="lg"
          onPress={handleStartRecipe}
          style={{ flex: 1 }}
        >
          Start Recipe
        </Button>

        <Button
          variant="outline"
          size="lg"
          onPress={handleShare}
          style={{
            width: 56,
            aspectRatio: 1,
          }}
        >
          <MaterialIcons name="share" size={24} color={theme.colors.primary} />
        </Button>
      </View>
    </View>
  );
}
