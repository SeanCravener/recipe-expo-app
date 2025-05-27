// components/composites/RatingModal.tsx
import React, { useEffect, useState } from "react";
import { Pressable } from "react-native";
import { useTheme } from "../../../hooks/useTheme";
import { Button, Icon, Modal, Text, View } from "../../ui";

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
    <Modal visible={visible} onClose={onClose}>
      <Text
        variant="title"
        fontWeight="bold"
        style={{ marginBottom: theme.spacing.md }}
      >
        Rate This Item
      </Text>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginBottom: theme.spacing.lg,
        }}
      >
        {Array.from({ length: maxStars }, (_, index) => {
          const filled = index < selectedRating;
          return (
            <Pressable
              key={index}
              onPress={() => handleSelect(index + 1)}
              hitSlop={8}
            >
              <Icon
                name="star"
                size={32}
                color={filled ? "primary" : "onSurfaceVariant"}
                style={{ marginHorizontal: theme.spacing.xs }}
              />
            </Pressable>
          );
        })}
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          gap: theme.spacing.sm,
        }}
      >
        <Button
          title="Cancel"
          variant="outlined"
          onPress={onClose}
          style={{ flex: 1 }}
        />
        <Button title="Save Rating" onPress={handleSave} style={{ flex: 1 }} />
      </View>
    </Modal>
  );
};
