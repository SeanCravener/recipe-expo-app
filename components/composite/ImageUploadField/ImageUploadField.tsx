import React, { useState } from "react";
import { Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "@/theme/hooks/useTheme";
import { useImageUpload } from "@/hooks/useImageUpload";
import { View, Text, Image, Card, Loading, Error } from "@/components/ui";

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
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async () => {
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
  };

  return (
    <View margin="md">
      <Text variant="bodyNormalBold" style={{ marginBottom: 8 }}>
        {label}
      </Text>

      <Pressable
        onPress={handleUpload}
        disabled={isUploading}
        style={{ opacity: isUploading ? 0.7 : 1 }}
      >
        <Card
          variant="outlined"
          style={{
            height: 200,
            padding: 0,
            overflow: "hidden",
          }}
        >
          {value ? (
            <Image
              source={{ uri: value }}
              variant="cover"
              style={{ width: "100%", height: "100%" }}
            />
          ) : (
            <View
              variant="centered"
              backgroundColor="surfaceVariant"
              style={{ flex: 1 }}
            >
              {isUploading ? (
                <Loading variant="spinner" />
              ) : (
                <>
                  <MaterialIcons
                    name="add-photo-alternate"
                    size={32}
                    color={theme.colors.onSurfaceVariant}
                  />
                  <Text
                    variant="bodySmallMedium"
                    color="onSurfaceVariant"
                    style={{ marginTop: 8 }}
                  >
                    Upload Image
                  </Text>
                </>
              )}
            </View>
          )}
        </Card>
      </Pressable>

      {error && (
        <View style={{ marginTop: 8 }}>
          <Error variant="text" message={error} />
        </View>
      )}
    </View>
  );
};
