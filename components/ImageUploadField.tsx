import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useImageUpload } from "../hooks/useImageUpload";

interface ImageUploadFieldProps {
  value?: string;
  onChange: (url: string) => void;
  label: string;
  bucket?: "item-images" | "instruction-images";
}

export function ImageUploadField({
  value,
  onChange,
  label,
  bucket = "item-images",
}: ImageUploadFieldProps) {
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
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Pressable
        style={styles.uploadButton}
        onPress={handleUpload}
        disabled={isUploading}
      >
        {value ? (
          <Image
            source={{ uri: value }}
            style={styles.preview}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.placeholder}>
            <MaterialIcons name="add-photo-alternate" size={32} color="#666" />
            <Text style={styles.placeholderText}>
              {isUploading ? "Uploading..." : "Upload Image"}
            </Text>
          </View>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  uploadButton: {
    height: 200,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    overflow: "hidden",
  },
  preview: {
    width: "100%",
    height: "100%",
  },
  placeholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  placeholderText: {
    marginTop: 8,
    fontSize: 16,
    color: "#666",
  },
});
