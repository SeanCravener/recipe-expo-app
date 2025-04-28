import { useState, useCallback } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  Alert,
  useWindowDimensions,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, router, Stack } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useItem } from "../../../hooks/useItem";
import { RatingModal } from "../../../components/RatingModal";
import { Instruction } from "../../../types/item";
import { useAuth } from "../../../contexts/auth/AuthContext";

export default function Instructions() {
  const { id } = useLocalSearchParams();
  const { data: item, isLoading, submitRating } = useItem(id as string);
  const { session } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isRatingModalVisible, setIsRatingModalVisible] = useState(false);
  const { width } = useWindowDimensions();

  const handleExit = useCallback(() => {
    Alert.alert(
      "Exit Recipe",
      "Are you sure you want to exit? Your progress will be lost.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Exit",
          style: "destructive",
          onPress: () => router.back(),
        },
      ]
    );
  }, []);

  const handlePrevious = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  }, [currentStep]);

  const handleNext = useCallback(() => {
    if (item?.instructions && currentStep < item.instructions.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  }, [currentStep, item]);

  const handleFinish = useCallback(() => {
    if (!session) router.back();
    setIsRatingModalVisible(true);
  }, []);

  const handleCloseRating = useCallback(() => {
    setIsRatingModalVisible(false);
    router.back();
  }, []);

  if (isLoading || !item) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (!item.instructions || item.instructions.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No instructions available</Text>
      </View>
    );
  }

  const currentInstruction = item.instructions[currentStep] as Instruction;
  const isLastStep = currentStep === item.instructions.length - 1;
  const imageToShow = currentInstruction["image-url"] || item.main_image;

  const handleRating = async (rating: number) => {
    return new Promise<void>((resolve, reject) => {
      submitRating(rating, {
        onSuccess: () => resolve(),
        onError: (error) => reject(error),
      });
    });
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: item.title,
          headerRight: () => (
            <Pressable
              onPress={() => setIsDrawerOpen(true)}
              style={styles.headerButton}
            >
              <MaterialIcons name="list" size={24} color="#007AFF" />
            </Pressable>
          ),
        }}
      />
      <View style={styles.container}>
        <Image
          source={{ uri: imageToShow }}
          style={[styles.image, { width }]}
          resizeMode="cover"
        />
        <View style={styles.content}>
          <Text style={styles.stepHeader}>Step {currentStep + 1}</Text>
          <Text style={styles.instruction}>{currentInstruction.content}</Text>
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progress,
                  {
                    width: `${
                      ((currentStep + 1) / item.instructions.length) * 100
                    }%`,
                  },
                ]}
              />
            </View>
            <Text style={styles.progressText}>
              Step {currentStep + 1} of {item.instructions.length}
            </Text>
          </View>
        </View>
        <View style={styles.footer}>
          {isLastStep ? (
            <Pressable style={styles.finishButton} onPress={handleFinish}>
              <Text style={styles.finishButtonText}>Finish Recipe</Text>
            </Pressable>
          ) : (
            <View style={styles.buttonRow}>
              <Pressable style={styles.exitButton} onPress={handleExit}>
                <Text style={styles.exitButtonText}>Exit</Text>
              </Pressable>
              <Pressable
                style={[
                  styles.navButton,
                  currentStep === 0 && styles.buttonDisabled,
                ]}
                onPress={handlePrevious}
                disabled={currentStep === 0}
              >
                <Text style={styles.navButtonText}>Previous</Text>
              </Pressable>
              <Pressable style={styles.navButton} onPress={handleNext}>
                <Text style={styles.navButtonText}>Next</Text>
              </Pressable>
            </View>
          )}
        </View>
      </View>

      {isDrawerOpen && (
        <View style={styles.drawer}>
          <View style={styles.drawerHeader}>
            <Text style={styles.drawerTitle}>Ingredients</Text>
            <Pressable onPress={() => setIsDrawerOpen(false)}>
              <MaterialIcons name="close" size={24} color="#666" />
            </Pressable>
          </View>
          <View style={styles.drawerContent}>
            {item.ingredients?.map((ingredient, index) => (
              <Text key={index} style={styles.ingredient}>
                • {ingredient}
              </Text>
            ))}
          </View>
        </View>
      )}

      <RatingModal
        isVisible={isRatingModalVisible}
        onClose={handleCloseRating}
        onSubmit={handleRating}
        itemTitle={item.title}
      />
    </>
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
  image: {
    height: 300,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  stepHeader: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  instruction: {
    fontSize: 18,
    lineHeight: 28,
    marginBottom: 24,
  },
  progressContainer: {
    marginTop: "auto",
  },
  progressBar: {
    height: 4,
    backgroundColor: "#eee",
    borderRadius: 2,
    marginBottom: 8,
  },
  progress: {
    height: "100%",
    backgroundColor: "#007AFF",
    borderRadius: 2,
  },
  progressText: {
    textAlign: "center",
    color: "#666",
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  buttonRow: {
    flexDirection: "row",
    gap: 8,
  },
  exitButton: {
    flex: 1,
    backgroundColor: "#FF3B30",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
  },
  exitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  navButton: {
    flex: 1,
    backgroundColor: "#007AFF",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
  },
  navButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  finishButton: {
    backgroundColor: "#34C759",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
  },
  finishButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  headerButton: {
    padding: 8,
    marginRight: 8,
  },
  drawer: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: 300,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: -2,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  drawerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  drawerTitle: {
    fontSize: 20,
    fontWeight: "600",
  },
  drawerContent: {
    padding: 16,
  },
  ingredient: {
    fontSize: 16,
    marginBottom: 12,
    lineHeight: 24,
  },
});
