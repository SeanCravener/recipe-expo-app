import React, { useState, useCallback } from "react";
import { useWindowDimensions } from "react-native";
import { useLocalSearchParams, router, Stack } from "expo-router";
import { useItem } from "@/hooks/useItem";
import { useAuth } from "@/contexts/auth/AuthContext";
import { useTheme } from "@/theme/hooks/useTheme";
import { Instruction } from "@/types/item";
import {
  RatingModal,
  StepProgressBar,
  IngredientsDrawer,
} from "@/components/composite";
import { Button, Loading, Text, View, Image } from "@/components/ui";

export default function Instructions() {
  const { id } = useLocalSearchParams();
  const { data: item, isLoading, submitRating } = useItem(id as string);
  const { session } = useAuth();
  const { theme } = useTheme();
  const [currentStep, setCurrentStep] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isRatingModalVisible, setIsRatingModalVisible] = useState(false);
  const { width } = useWindowDimensions();

  const handleExit = useCallback(() => {
    router.back();
  }, []);

  const handlePrevious = useCallback(() => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  }, [currentStep]);

  const handleNext = useCallback(() => {
    if (item?.instructions && currentStep < item.instructions.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  }, [currentStep, item]);

  const handleFinish = useCallback(() => {
    if (!session) return router.back();
    setIsRatingModalVisible(true);
  }, [session]);

  const handleCloseRating = useCallback(() => {
    setIsRatingModalVisible(false);
    router.back();
  }, []);

  const handleRating = async (rating: number) => {
    return new Promise<void>((resolve, reject) => {
      submitRating(rating, {
        onSuccess: () => resolve(),
        onError: (error) => reject(error),
      });
    });
  };

  if (isLoading || !item) {
    return (
      <View variant="centered" style={{ flex: 1 }}>
        <Loading variant="spinner" />
      </View>
    );
  }

  if (!item.instructions || item.instructions.length === 0) {
    return (
      <View variant="centered" padding="lg">
        <Text variant="bodyNormalRegular" color="onSurfaceVariant">
          No instructions available.
        </Text>
      </View>
    );
  }

  const currentInstruction = item.instructions[currentStep] as Instruction;
  const isLastStep = currentStep === item.instructions.length - 1;
  const imageToShow = currentInstruction["image-url"] || item.main_image;

  // Transform ingredients for the drawer
  const transformedIngredients = (item.ingredients || []).map((ingredient) =>
    typeof ingredient === "string" ? { value: ingredient } : ingredient
  );

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: item.title,
          headerStyle: {
            backgroundColor: theme.colors.surface,
          },
          headerTintColor: theme.colors.onSurface,
          headerRight: () => (
            <Button
              variant="ghost"
              size="sm"
              onPress={() => setIsDrawerOpen(true)}
              style={{ marginRight: 8 }}
            >
              Ingredients
            </Button>
          ),
        }}
      />

      <View variant="default" backgroundColor="background">
        <Image
          source={{ uri: imageToShow }}
          variant="cover"
          style={{ width, height: 300 }}
        />

        <View padding="lg" style={{ flex: 1 }}>
          <Text variant="bodyLargeMedium" style={{ marginBottom: 12 }}>
            Step {currentStep + 1}
          </Text>

          <Text
            variant="bodyNormalRegular"
            style={{ marginBottom: 16, lineHeight: 24 }}
          >
            {currentInstruction.content}
          </Text>

          <StepProgressBar
            currentStep={currentStep + 1}
            totalSteps={item.instructions.length}
          />
        </View>

        <View
          padding="md"
          backgroundColor="surface"
          style={{
            borderTopWidth: 1,
            borderTopColor: theme.colors.outline,
          }}
        >
          {isLastStep ? (
            <Button
              variant="primary"
              size="lg"
              onPress={handleFinish}
              fullWidth
            >
              Finish Recipe
            </Button>
          ) : (
            <View variant="row" style={{ gap: 8 }}>
              <Button
                variant="outline"
                size="md"
                onPress={handleExit}
                style={{ flex: 1 }}
              >
                Exit
              </Button>
              <Button
                variant="outline"
                size="md"
                onPress={handlePrevious}
                disabled={currentStep === 0}
                style={{ flex: 1 }}
              >
                Previous
              </Button>
              <Button
                variant="primary"
                size="md"
                onPress={handleNext}
                style={{ flex: 1 }}
              >
                Next
              </Button>
            </View>
          )}
        </View>
      </View>

      <IngredientsDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        ingredients={transformedIngredients}
      />

      <RatingModal
        visible={isRatingModalVisible}
        onClose={handleCloseRating}
        onSubmit={handleRating}
      />
    </>
  );
}
