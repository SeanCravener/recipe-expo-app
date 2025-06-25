import React from "react";
import { Control, FieldValues, FieldPath } from "react-hook-form";
import { StyleProp, ViewStyle } from "react-native";
import { useTheme } from "@/theme/hooks/useTheme";
import { View, Text } from "@/components/ui";
import { ItemFormField, ImageUploadField } from "@/components/composite";

interface InstructionFormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  index: number;
  setValue: (name: FieldPath<T>, value: any) => void;
  watch: (name: FieldPath<T>) => any;
  // Enhanced props
  disabled?: boolean;
  showImageUpload?: boolean;
  onRemove?: () => void;
  style?: StyleProp<ViewStyle>;
  compact?: boolean;
}

export const InstructionFormField = <T extends FieldValues>({
  control,
  name,
  index,
  setValue,
  watch,
  disabled = false,
  showImageUpload = true,
  onRemove,
  style,
  compact = false,
}: InstructionFormFieldProps<T>) => {
  const { theme } = useTheme();

  // Watch the current instruction content for dynamic placeholder
  const currentContent = watch(`${name}.content` as FieldPath<T>);
  const hasContent = currentContent && currentContent.trim().length > 0;

  // Dynamic placeholder based on step number
  const placeholder = React.useMemo(() => {
    const stepActions = [
      "Preheat oven to 350°F...",
      "In a large bowl, mix...",
      "Add ingredients and stir...",
      "Pour mixture into pan...",
      "Bake for 25-30 minutes...",
      "Let cool before serving...",
    ];

    return stepActions[index] || `Enter step ${index + 1} instructions...`;
  }, [index]);

  // Get instruction image URL
  const imageUrl = watch(`${name}.image-url` as FieldPath<T>);

  return (
    <View
      style={[
        {
          backgroundColor: theme.colors.surfaceVariant,
          borderRadius: theme.borderRadius.md,
          padding: compact ? theme.spacing.md : theme.spacing.lg,
          marginBottom: theme.spacing.md,
          opacity: disabled ? 0.6 : 1,
          ...theme.elevation.level1,
        },
        style,
      ]}
    >
      {/* Step header */}
      <View
        variant="row"
        style={{
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: compact ? theme.spacing.sm : theme.spacing.md,
        }}
      >
        <Text variant="bodyNormalBold" color="onSurfaceVariant">
          Step {index + 1}
        </Text>

        {/* Optional content indicator */}
        {hasContent && (
          <View
            style={{
              backgroundColor: theme.colors.primary,
              borderRadius: theme.borderRadius.full,
              width: 8,
              height: 8,
            }}
          />
        )}
      </View>

      {/* Instruction content */}
      <View style={{ marginBottom: showImageUpload ? theme.spacing.md : 0 }}>
        <ItemFormField
          control={control}
          name={`${name}.content` as FieldPath<T>}
          label=""
          placeholder={placeholder}
          multiline
          disabled={disabled}
          helpText={
            index === 0 ? "Describe each step clearly and in detail" : undefined
          }
        />
      </View>

      {/* Optional image upload */}
      {showImageUpload && (
        <ImageUploadField
          label={compact ? "Image" : "Step Image (Optional)"}
          value={imageUrl}
          onChange={(url) => setValue(`${name}.image-url` as FieldPath<T>, url)}
          bucket="instruction-images"
          disabled={disabled}
          height={compact ? 120 : 160}
          helpText={compact ? undefined : "Add a visual guide for this step"}
          placeholder="Add step image"
          style={{ marginBottom: 0 }} // Remove bottom margin since we're in a card
        />
      )}

      {/* Progress indicator */}
      {!compact && (
        <View
          style={{
            marginTop: theme.spacing.sm,
            paddingTop: theme.spacing.sm,
            borderTopWidth: 1,
            borderTopColor: theme.colors.outline,
          }}
        >
          <Text variant="bodyXSmallRegular" color="onSurfaceVariant">
            {hasContent
              ? `${currentContent.length} characters`
              : "Start typing your instruction..."}
          </Text>
        </View>
      )}
    </View>
  );
};
