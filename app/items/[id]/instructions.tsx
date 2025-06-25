import React, { useState, useCallback } from "react";
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
import { Button, Loading, Text, View, Image, Scroll } from "@/components/ui";

export default function Instructions() {
  const { id } = useLocalSearchParams();
  const { data: item, isLoading, submitRating } = useItem(id as string);
  const { session } = useAuth();
  const { theme } = useTheme();
  const [currentStep, setCurrentStep] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isRatingModalVisible, setIsRatingModalVisible] = useState(false);

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
      <View style={{ flex: 1 }} backgroundColor="background">
        <Stack.Screen
          options={{
            headerTitle: "",
            headerTransparent: true,
            headerStyle: {
              backgroundColor: "transparent",
            },
            headerTintColor: theme.colors.onPrimary,
            headerRight: () =>
              !isDrawerOpen ? (
                <Button
                  variant="primary"
                  size="sm"
                  onPress={() => setIsDrawerOpen(true)}
                  style={{
                    marginRight: 8,
                    minHeight: 44,
                    minWidth: 44,
                    pointerEvents: "auto",
                  }}
                >
                  Ingredients
                </Button>
              ) : null,
            headerLeft: () => null,
          }}
        />

        {!isDrawerOpen && (
          <Button
            variant="primary"
            size="sm"
            onPress={() => setIsDrawerOpen(true)}
            style={{
              marginRight: 8,
              minHeight: 44,
              minWidth: 44,
              pointerEvents: "auto",
            }}
          >
            Ingredients
          </Button>
        )}

        <Image
          source={{ uri: imageToShow }}
          variant="cover"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 300,
            zIndex: 1,
          }}
        />

        {/* Content Container - Fixed in place */}
        <View
          style={{
            position: "absolute",
            top: 300 - 40,
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
                paddingBottom: 100,
                flex: 1,
                paddingHorizontal: theme.spacing.lg,
                paddingTop: theme.spacing.lg, // Add space for footer
              }}
              showsVerticalScrollIndicator={false} // Optional: cleaner look
            >
              <Text variant="headerThree">{item.title}</Text>
              {/* Divider (TURN INTO SEPERATE UI COMPONENT LATER) */}
              <View
                style={{
                  marginVertical: 12,
                  borderRadius: 8,
                  borderWidth: 1,
                  marginHorizontal: 6,
                  borderColor: "#CFE8E9", // Fix later, change to constant. Pull from theme?
                }}
              ></View>

              {/* Description */}
              <Text variant="bodyNormalBold" style={{ marginBottom: 12 }}>
                Step {currentStep + 1}
              </Text>
              <Text
                variant="bodyNormalRegular"
                style={{ marginBottom: 16, height: "100%" }}
              >
                {currentInstruction.content}
              </Text>
              <StepProgressBar
                currentStep={currentStep + 1}
                totalSteps={item.instructions.length}
              />
            </Scroll>
          </View>
        </View>
        {/* Fixed Footer */}
        <View
          variant="row"
          padding="md"
          backgroundColor="surface"
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            borderTopWidth: 1,
            borderTopColor: theme.colors.tertiaryContainer,
            gap: 12,
            zIndex: 3,
            boxShadow: "0px 0px 8px 1px #A1D9DD",
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
            <View variant="row" style={{ gap: 8, flex: 1 }}>
              <Button
                variant="primary"
                size="md"
                onPress={handleExit}
                style={{ flex: 1 }}
              >
                Exit
              </Button>
              <Button
                variant="primary"
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

        <IngredientsDrawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          ingredients={transformedIngredients}
        />

        <RatingModal
          visible={isRatingModalVisible}
          onClose={handleCloseRating}
          onSubmit={handleRating}
          itemTitle={item.title}
        />
      </View>
    </>
  );
}
