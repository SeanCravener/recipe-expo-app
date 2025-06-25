import React, { useEffect, useState } from "react";
import { Pressable } from "react-native";
import { useTheme } from "@/theme/hooks/useTheme";
import { Button, Modal, Text, View, Icon } from "@/components/ui";

interface RatingModalProps {
  visible: boolean;
  onSubmit: (rating: number) => void;
  onClose: () => void;
  initialRating?: number;
  maxStars?: number;
  itemTitle?: string;
}

export const RatingModal: React.FC<RatingModalProps> = ({
  visible,
  onSubmit,
  onClose,
  initialRating = 0,
  maxStars = 5,
  itemTitle = "This Item",
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
        variant="bodyLargeRegular"
        style={{ marginBottom: 16, textAlign: "center" }}
      >
        How would you rate{" "}
        <Text variant="bodyLargeMedium">{itemTitle} Recipe?</Text>
      </Text>

      <View
        variant="row"
        style={{
          justifyContent: "space-evenly",
          marginBottom: 24,
          paddingHorizontal: 24,
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
                marginVertical: 4,
              }}
              hitSlop={8}
            >
              <Icon
                name="star"
                variant={filled ? "filled" : "unfilled"}
                size={32}
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
          Not Now
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
