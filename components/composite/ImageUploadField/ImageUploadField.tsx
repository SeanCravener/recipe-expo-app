import React, { useState, useCallback } from "react";
import { Pressable, StyleProp, ViewStyle } from "react-native";
import { useTheme } from "@/theme/hooks/useTheme";
import { useImageUpload } from "@/hooks/useImageUpload";
import { View, Text, Image, Card, Loading, Error, Icon } from "@/components/ui";

interface ImageUploadFieldProps {
  value?: string;
  onChange: (url: string) => void;
  label: string;
  bucket?: "item-images" | "instruction-images";
  // Enhanced props
  disabled?: boolean;
  required?: boolean;
  helpText?: string;
  height?: number;
  showRemoveButton?: boolean;
  onRemove?: () => void;
  style?: StyleProp<ViewStyle>;
  placeholder?: string;
}

export const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
  value,
  onChange,
  label,
  bucket = "item-images",
  disabled = false,
  required = false,
  helpText,
  height = 200,
  showRemoveButton = true,
  onRemove,
  style,
  placeholder = "Upload Image",
}) => {
  const { theme } = useTheme();
  const { pickImage, uploadImage, isUploading } = useImageUpload();
  const [error, setError] = useState<string | null>(null);

  // Memoized upload handler
  const handleUpload = useCallback(async () => {
    if (disabled || isUploading) return;

    try {
      setError(null);
      const image = await pickImage();
      if (image) {
        const url = await uploadImage(image.uri, bucket, value);
        onChange(url);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      setError("Failed to upload image. Please try again.");
    }
  }, [disabled, isUploading, pickImage, uploadImage, bucket, value, onChange]);

  // Memoized remove handler
  const handleRemove = useCallback(() => {
    if (disabled) return;

    if (onRemove) {
      onRemove();
    } else {
      onChange("");
    }
    setError(null);
  }, [disabled, onRemove, onChange]);

  // Loading state check
  const isDisabled = disabled || isUploading;

  return (
    <View style={[{ marginBottom: theme.spacing.lg }, style]}>
      {/* Label and help text */}
      <View style={{ marginBottom: theme.spacing.sm }}>
        <View variant="row" style={{ alignItems: "center", marginBottom: 4 }}>
          <Text variant="bodyNormalBold">
            {label}
            {required && (
              <Text variant="bodyNormalBold" color="error">
                {" "}
                *
              </Text>
            )}
          </Text>

          {/* Remove button - only show if image exists and removal is allowed */}
          {value && showRemoveButton && (
            <Icon
              name="edit-three" // Use as close/remove icon
              variant="unfilled"
              size="sm"
              color={isDisabled ? "onSurfaceVariant" : "error"}
              onPress={isDisabled ? undefined : handleRemove}
              hitSlop="sm"
              style={{ marginLeft: theme.spacing.sm }}
            />
          )}
        </View>

        {helpText && (
          <Text
            variant="bodySmallRegular"
            color="onSurfaceVariant"
            style={{ marginTop: 2 }}
          >
            {helpText}
          </Text>
        )}
      </View>

      {/* Upload area */}
      <Pressable
        onPress={handleUpload}
        disabled={isDisabled}
        style={({ pressed }) => ({
          opacity: isDisabled ? 0.6 : pressed ? 0.8 : 1,
        })}
        accessibilityRole="button"
        accessibilityLabel={value ? "Change image" : "Upload image"}
        accessibilityState={{ disabled: isDisabled }}
      >
        <Card
          variant="outlined"
          style={{
            height,
            padding: 0,
            overflow: "hidden",
            borderStyle: isUploading ? "dashed" : "solid",
            borderColor: error
              ? theme.colors.error
              : isUploading
              ? theme.colors.primary
              : theme.colors.outline,
          }}
        >
          {value && !isUploading ? (
            // Show uploaded image
            <View
              style={{ position: "relative", width: "100%", height: "100%" }}
            >
              <Image
                source={{ uri: value }}
                variant="cover"
                style={{ width: "100%", height: "100%" }}
              />

              {/* Overlay with change icon */}
              <View
                style={{
                  position: "absolute",
                  top: theme.spacing.sm,
                  right: theme.spacing.sm,
                  backgroundColor: theme.colors.surface,
                  borderRadius: theme.borderRadius.sm,
                  padding: theme.spacing.xs,
                  ...theme.elevation.level2,
                }}
              >
                <Icon
                  name="edit-one"
                  variant="unfilled"
                  size="sm"
                  color="onSurface"
                />
              </View>
            </View>
          ) : (
            // Show upload placeholder
            <View
              variant="centered"
              backgroundColor="surfaceVariant"
              style={{ flex: 1 }}
            >
              {isUploading ? (
                <View variant="centered">
                  <Loading variant="spinner" />
                  <Text
                    variant="bodySmallMedium"
                    color="onSurfaceVariant"
                    style={{ marginTop: theme.spacing.sm }}
                  >
                    Uploading...
                  </Text>
                </View>
              ) : (
                <View variant="centered">
                  <Icon
                    name="add"
                    variant="unfilled"
                    size="lg"
                    color="onSurfaceVariant"
                    style={{ marginBottom: theme.spacing.sm }}
                  />
                  <Text variant="bodySmallMedium" color="onSurfaceVariant">
                    {placeholder}
                  </Text>
                  {!disabled && (
                    <Text
                      variant="bodyXSmallRegular"
                      color="onSurfaceVariant"
                      style={{ marginTop: theme.spacing.xs }}
                    >
                      Tap to select
                    </Text>
                  )}
                </View>
              )}
            </View>
          )}
        </Card>
      </Pressable>

      {/* Error message */}
      {error && (
        <View style={{ marginTop: theme.spacing.sm }}>
          <Error variant="text" message={error} />
        </View>
      )}
    </View>
  );
};
