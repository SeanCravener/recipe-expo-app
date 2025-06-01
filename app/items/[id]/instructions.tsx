import React, { useState, useCallback } from "react";
import { Image, useWindowDimensions } from "react-native";
import { useLocalSearchParams, router, Stack } from "expo-router";
import { useItem } from "@/hooks/useItem";
import { useAuth } from "@/contexts/auth/AuthContext";
import { Instruction } from "@/types/item";
import {
  RatingModal,
  StepProgressBar,
  IngredientsDrawer,
} from "@/components/composite";
import { Button, Loading, Text, View } from "@/components/ui";

export default function Instructions() {
  const { id } = useLocalSearchParams();
  const { data: item, isLoading, submitRating } = useItem(id as string);
  const { session } = useAuth();
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
    return <Loading fullScreen />;
  }

  if (!item.instructions || item.instructions.length === 0) {
    return (
      <View padding="lg" style={{ alignItems: "center" }}>
        <Text>No instructions available.</Text>
      </View>
    );
  }

  const currentInstruction = item.instructions[currentStep] as Instruction;
  const isLastStep = currentStep === item.instructions.length - 1;
  const imageToShow = currentInstruction["image-url"] || item.main_image;

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: item.title,
          headerRight: () => (
            <Button
              title="List"
              variant="text"
              size="sm"
              onPress={() => setIsDrawerOpen(true)}
            />
          ),
        }}
      />

      <View style={{ flex: 1 }}>
        <Image
          source={{ uri: imageToShow }}
          style={{ width, height: 300 }}
          resizeMode="cover"
        />

        <View padding="lg" style={{ flex: 1 }}>
          <Text variant="title" fontWeight="bold" style={{ marginBottom: 12 }}>
            Step {currentStep + 1}
          </Text>

          <Text variant="body" style={{ marginBottom: 16 }}>
            {currentInstruction.content}
          </Text>

          <StepProgressBar
            currentStep={currentStep + 1}
            totalSteps={item.instructions.length}
          />
        </View>

        <View
          padding="md"
          style={{ borderTopWidth: 1, borderTopColor: "#eee" }}
        >
          {isLastStep ? (
            <Button
              title="Finish Recipe"
              color="tertiary"
              size="lg"
              onPress={handleFinish}
            />
          ) : (
            <View style={{ flexDirection: "row", gap: 8 }}>
              <Button
                title="Exit"
                color="secondary"
                variant="filled"
                size="md"
                onPress={handleExit}
                style={{ flex: 1 }}
              />
              <Button
                title="Previous"
                variant="outlined"
                size="md"
                onPress={handlePrevious}
                disabled={currentStep === 0}
                style={{ flex: 1 }}
              />
              <Button
                title="Next"
                size="md"
                onPress={handleNext}
                style={{ flex: 1 }}
              />
            </View>
          )}
        </View>
      </View>

      <IngredientsDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        ingredients={item.ingredients || []}
      />

      <RatingModal
        visible={isRatingModalVisible}
        onClose={handleCloseRating}
        onSubmit={handleRating}
      />
    </>
  );
}
