import React, { useEffect, useState } from "react";
import { Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "@/theme/hooks/useTheme";
import { Button, Modal, Text, View } from "@/components/ui";

interface RatingModalProps {
  visible: boolean;
  onSubmit: (rating: number) => void;
  onClose: () => void;
  initialRating?: number;
  maxStars?: number;
}

export const RatingModal: React.FC<RatingModalProps> = ({
  visible,
  onSubmit,
  onClose,
  initialRating = 0,
  maxStars = 5,
}) => {
  const { theme } = useTheme();
  const [selectedRating, setSelectedRating] = useState(initialRating);

  useEffect(() => {
    // Reset when the modal is opened
    if (visible) {
      setSelectedRating(initialRating);
    }
  }, [visible, initialRating]);

  const handleSelect = (rating: number) => {
    setSelectedRating(rating);
  };

  const handleSave = () => {
    onSubmit(selectedRating);
    onClose();
  };

  return (
    <Modal variant="default" visible={visible} onClose={onClose}>
      <Text
        variant="bodyLargeMedium"
        style={{ marginBottom: 16, textAlign: "center" }}
      >
        Rate This Item
      </Text>

      <View
        variant="row"
        style={{
          justifyContent: "center",
          marginBottom: 24,
          gap: 4,
        }}
      >
        {Array.from({ length: maxStars }, (_, index) => {
          const filled = index < selectedRating;
          return (
            <Pressable
              key={index}
              onPress={() => handleSelect(index + 1)}
              style={{
                padding: 4,
                borderRadius: theme.borderRadius.sm,
              }}
              hitSlop={8}
            >
              <MaterialIcons
                name={filled ? "star" : "star-border"}
                size={32}
                color={
                  filled ? theme.colors.primary : theme.colors.onSurfaceVariant
                }
              />
            </Pressable>
          );
        })}
      </View>

      <View
        variant="row"
        style={{
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        <Button
          variant="outline"
          size="md"
          onPress={onClose}
          style={{ flex: 1 }}
        >
          Cancel
        </Button>

        <Button
          variant="primary"
          size="md"
          onPress={handleSave}
          style={{ flex: 1 }}
        >
          Save Rating
        </Button>
      </View>
    </Modal>
  );
};
