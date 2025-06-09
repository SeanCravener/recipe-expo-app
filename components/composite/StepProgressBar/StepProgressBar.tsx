import React from "react";
import { View as RNView } from "react-native";
import { useTheme } from "@/theme/hooks/useTheme";
import { Text, View } from "@/components/ui";

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
        variant="row"
        style={{
          justifyContent: "flex-end",
          marginBottom: 4,
        }}
      >
        <Text variant="bodySmallRegular" color="onSurfaceVariant">
          Step {currentStep} of {totalSteps}
        </Text>
      </View>

      <View
        style={{
          height: 8,
          backgroundColor: theme.colors.surfaceVariant,
          borderRadius: theme.borderRadius.full,
          overflow: "hidden",
        }}
      >
        <RNView
          style={{
            height: "100%",
            width: `${progress * 100}%`,
            backgroundColor: theme.colors.primary,
            borderRadius: theme.borderRadius.full,
          }}
        />
      </View>
    </View>
  );
};
