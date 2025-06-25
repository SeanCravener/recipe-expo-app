import React from "react";
import { useLocalSearchParams, router, Stack } from "expo-router";
import { useItem } from "@/hooks/useItem";
import { useAuth } from "@/contexts/auth/AuthContext";
import { useTheme } from "@/theme/hooks/useTheme";
import {
  View,
  Image,
  Button,
  Loading,
  Scroll,
  IconButton,
} from "@/components/ui";
import { ItemDetails, ShareButton } from "@/components/composite";

// Fix this later. Set up dynamically/responsive?
const IMAGE_HEIGHT = 300;
const CONTENT_OVERLAP = 40; // How much the content overlaps the image

export default function ItemDetail() {
  const { id } = useLocalSearchParams();
  const { data: item, isLoading } = useItem(id as string);
  const { session } = useAuth();
  const { theme } = useTheme();

  const handleStartRecipe = () => {
    router.push(`/items/${id}/instructions`);
  };

  const handleEditRecipe = () => {
    router.push(`/items/${id}/edit`);
  };

  const handleBackButton = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/");
    }
  };

  if (isLoading || !item) {
    return (
      <View variant="centered" style={{ flex: 1 }}>
        <Loading variant="spinner" />
      </View>
    );
  }

  const isOwner = session?.user.id === item.user_id;

  return (
    <View style={{ flex: 1 }} backgroundColor="background">
      <Stack.Screen
        options={{
          headerTitle: "",
          headerTransparent: true,
          headerStyle: {
            backgroundColor: "transparent",
          },
          headerTintColor: theme.colors.onPrimary,
          headerRight: isOwner
            ? () => (
                <IconButton
                  icon="edit-one"
                  iconVariant="filled"
                  variant="secondary"
                  size="md"
                  onPress={handleEditRecipe}
                  accessibilityLabel="Edit Recipe"
                  compact={true}
                  style={{
                    marginRight: theme.spacing.sm,
                    marginTop: theme.spacing.md,
                  }}
                />
              )
            : undefined,
          headerLeft: () => (
            <IconButton
              icon="arrow-back"
              variant="secondary"
              size="md"
              onPress={handleBackButton}
              accessibilityLabel="Go back"
              compact={true}
              style={{
                marginTop: theme.spacing.md,
                marginLeft: theme.spacing.sm,
              }}
            />
          ),
        }}
      />

      {/* Fixed Image */}
      <Image
        source={{ uri: item.main_image }}
        variant="cover"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: IMAGE_HEIGHT,
          zIndex: 1,
        }}
      />

      {/* Content Container - Fixed in place */}
      <View
        style={{
          position: "absolute",
          top: IMAGE_HEIGHT - CONTENT_OVERLAP,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 2,
        }}
      >
        <View
          backgroundColor="background"
          style={{
            flex: 1,
            borderTopLeftRadius: theme.borderRadius.xl,
            borderTopRightRadius: theme.borderRadius.xl,
            boxShadow: "0px 0px 15px 2px #41111D",
            overflow: "hidden", // Ensures content doesn't spill outside rounded corners
          }}
        >
          {/* Scrollable Content Inside Fixed Container */}
          <Scroll
            variant="flush"
            style={{ flex: 1 }}
            contentContainerStyle={{
              paddingBottom: 80, // Add space for footer
            }}
            showsVerticalScrollIndicator={false} // Optional: cleaner look
          >
            <ItemDetails
              id={item.id}
              title={item.title}
              category={item.category}
              rating={item.average_rating || 0}
              description={item.description}
              ingredients={(item.ingredients || []).map((ingredient) =>
                typeof ingredient === "string"
                  ? { value: ingredient }
                  : ingredient
              )}
              authorId={item.user_id}
            />
          </Scroll>
        </View>
      </View>

      {/* Fixed Footer */}
      <View
        variant="row"
        padding="md"
        backgroundColor="tertiaryContainer"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          borderTopWidth: 0.5,
          borderTopColor: theme.colors.tertiaryContainer, // Mess around with this later, possible change entire way it is styled.
          gap: 12,
          zIndex: 3,
          boxShadow: "0px 0px 8px 1px #A1D9DD",
        }}
      >
        <Button
          variant="primary"
          size="lg"
          onPress={handleStartRecipe}
          style={{ flex: 1, maxHeight: 48 }} // Find a better way to do this with maxHeight when refactoring.
        >
          Start Recipe
        </Button>

        <ShareButton
          title={item.title}
          message={`Check out this recipe: ${item.title}`}
          size="lg"
          variant="primary"
        />
      </View>
    </View>
  );
}
