import React from "react";
import { Image, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "@/hooks/useTheme";
import { useImageUpload } from "@/hooks/useImageUpload";
import { View, Text } from "@/components/ui";

interface ImageUploadFieldProps {
  value?: string;
  onChange: (url: string) => void;
  label: string;
  bucket?: "item-images" | "instruction-images";
}

export const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
  value,
  onChange,
  label,
  bucket = "item-images",
}) => {
  const { theme } = useTheme();
  const { pickImage, uploadImage, isUploading } = useImageUpload();

  const handleUpload = async () => {
    try {
      const image = await pickImage();
      if (image) {
        const url = await uploadImage(image.uri, bucket, value);
        onChange(url);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <View margin="md">
      <Text
        variant="label"
        fontWeight="bold"
        style={{ marginBottom: theme.spacing.sm }}
      >
        {label}
      </Text>
      <Pressable
        onPress={handleUpload}
        disabled={isUploading}
        style={{
          height: 200,
          borderWidth: 1,
          borderColor: theme.colors.outlineVariant,
          borderRadius: theme.borderRadius.md,
          overflow: "hidden",
        }}
      >
        {value ? (
          <Image
            source={{ uri: value }}
            style={{ width: "100%", height: "100%" }}
            resizeMode="cover"
          />
        ) : (
          <View
            backgroundColor="surfaceContainerLowest"
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MaterialIcons
              name="add-photo-alternate"
              size={32}
              color={theme.colors.onSurfaceVariant}
            />
            <Text
              variant="label"
              color="onSurfaceVariant"
              style={{ marginTop: theme.spacing.xs }}
            >
              {isUploading ? "Uploading..." : "Upload Image"}
            </Text>
          </View>
        )}
      </Pressable>
    </View>
  );
};
