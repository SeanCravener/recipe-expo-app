// components/base/StepProgressBar.tsx
import React from "react";
import { View as RNView, StyleSheet } from "react-native";
import { useTheme } from "../../../hooks/useTheme";
import { Text, View } from "../../ui";

interface StepProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export const StepProgressBar: React.FC<StepProgressBarProps> = ({
  currentStep,
  totalSteps,
}) => {
  const { theme } = useTheme();
  const progress = Math.min(currentStep / totalSteps, 1);

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          marginBottom: theme.spacing.xs,
        }}
      >
        <Text variant="label" color="onSurface">
          Step {currentStep} of {totalSteps}
        </Text>
      </View>

      <RNView style={styles.container}>
        <RNView
          style={[
            styles.bar,
            {
              width: `${progress * 100}%`,
              backgroundColor: theme.colors.primary,
              borderRadius: theme.borderRadius.round,
            },
          ]}
        />
      </RNView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 8,
    backgroundColor: "#e6f0f1",
    borderRadius: 100,
    overflow: "hidden",
  },
  bar: {
    height: "100%",
  },
});
