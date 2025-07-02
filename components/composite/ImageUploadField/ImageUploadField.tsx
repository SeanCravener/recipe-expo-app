import React, { useState, useCallback } from "react";
import { Pressable, StyleProp, ViewStyle } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useTheme } from "@/theme/hooks/useTheme";
import { useImageUpload } from "@/hooks/useImageUpload";
import { View, Text, Image, Card, Loading, Error, Icon } from "@/components/ui";

interface ImageUploadFieldProps {
  value?: string;
  onChange: (url: string) => void;
  label: string;
  bucket?: "item-images" | "instruction-images";
  disabled?: boolean;
  required?: boolean;
  helpText?: string;
  height?: number;
  showRemoveButton?: boolean;
  onRemove?: () => void;
  style?: StyleProp<ViewStyle>;
  placeholder?: string;
  // New props for deferred mode
  deferUpload?: boolean;
  onImagePicked?: (uri: string) => void;
  localImageUri?: string;
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
  deferUpload = false,
  onImagePicked,
  localImageUri,
}) => {
  const { theme } = useTheme();
  const { pickImage, uploadImage, isUploading } = useImageUpload();
  const [error, setError] = useState<string | null>(null);

  // Determine what to display: local image takes precedence over uploaded URL
  const displayUri = localImageUri || value;

  // Handle image selection
  const handleImageSelect = useCallback(async () => {
    if (disabled || isUploading) return;

    try {
      setError(null);
      const image = await pickImage();

      if (image) {
        if (deferUpload && onImagePicked) {
          // In deferred mode, just pass the local URI
          onImagePicked(image.uri);
          // Clear the value since we're using local image
          onChange("");
        } else {
          // In immediate mode, upload right away
          const url = await uploadImage(image.uri, bucket, value);
          onChange(url);
        }
      }
    } catch (error) {
      console.error("Error handling image:", error);
      setError("Failed to process image. Please try again.");
    }
  }, [
    disabled,
    isUploading,
    pickImage,
    uploadImage,
    bucket,
    value,
    onChange,
    deferUpload,
    onImagePicked,
  ]);

  // Handle remove
  const handleRemove = useCallback(() => {
    if (disabled) return;

    // Clear local image if in deferred mode
    if (deferUpload && onImagePicked) {
      onImagePicked("");
    }

    // Clear the value
    onChange("");

    // Call custom remove handler if provided
    if (onRemove) {
      onRemove();
    }

    setError(null);
  }, [disabled, onChange, onRemove, deferUpload, onImagePicked]);

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
                *
              </Text>
            )}
          </Text>

          {/* Remove button */}
          {displayUri && showRemoveButton && (
            <Icon
              name="edit-three"
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
        onPress={handleImageSelect}
        disabled={isDisabled}
        style={({ pressed }) => ({
          opacity: isDisabled ? 0.6 : pressed ? 0.8 : 1,
        })}
        accessibilityRole="button"
        accessibilityLabel={displayUri ? "Change image" : "Select image"}
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
          {displayUri && !isUploading ? (
            // Show image preview
            <View
              style={{ position: "relative", width: "100%", height: "100%" }}
            >
              <Image
                source={{ uri: displayUri }}
                variant="cover"
                style={{ width: "100%", height: "100%" }}
              />

              {/* Change icon overlay */}
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

              {/* Show indicator for local images */}
              {deferUpload && localImageUri && !value && (
                <View
                  style={{
                    position: "absolute",
                    bottom: theme.spacing.sm,
                    left: theme.spacing.sm,
                    backgroundColor: theme.colors.primaryContainer,
                    borderRadius: theme.borderRadius.sm,
                    paddingHorizontal: theme.spacing.sm,
                    paddingVertical: theme.spacing.xs,
                    ...theme.elevation.level2,
                  }}
                >
                  <Text variant="bodyXSmallBold" color="onPrimaryContainer">
                    Ready to upload
                  </Text>
                </View>
              )}
            </View>
          ) : (
            // Show placeholder
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
                    name="add-image"
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
