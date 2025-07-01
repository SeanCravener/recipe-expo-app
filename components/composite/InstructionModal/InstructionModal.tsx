import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import { useTheme } from "@/theme/hooks/useTheme";
import { Modal, View, Text, Input, Button, Icon } from "@/components/ui";
import { ImageUploadField } from "@/components/composite";

interface InstructionModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (data: { content: string; "image-url": string }) => void;
  onDelete?: () => void;
  initialValue?: { content: string; "image-url": string };
  isEdit?: boolean;
  stepNumber?: number;
}

export const InstructionModal: React.FC<InstructionModalProps> = ({
  visible,
  onClose,
  onSave,
  onDelete,
  initialValue = { content: "", "image-url": "" },
  isEdit = false,
  stepNumber,
}) => {
  const { theme } = useTheme();
  const [content, setContent] = useState(initialValue.content);
  const [imageUrl, setImageUrl] = useState(initialValue["image-url"]);
  const [error, setError] = useState("");

  // Reset values when modal opens
  useEffect(() => {
    if (visible) {
      setContent(initialValue.content);
      setImageUrl(initialValue["image-url"]);
      setError("");
    }
  }, [visible, initialValue]);

  const handleSave = () => {
    const trimmedContent = content.trim();
    if (!trimmedContent) {
      setError("Instruction cannot be empty");
      return;
    }
    onSave({ content: trimmedContent, "image-url": imageUrl });
    setContent("");
    setImageUrl("");
    onClose();
  };

  const handleCancel = () => {
    setContent("");
    setImageUrl("");
    setError("");
    onClose();
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete();
      onClose();
    }
  };

  return (
    <Modal
      visible={visible}
      onClose={handleCancel}
      contentStyle={{
        width: "90%",
        maxWidth: 500,
        maxHeight: "80%",
        padding: theme.spacing.lg,
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View
          variant="row"
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: theme.spacing.lg,
          }}
        >
          <Text variant="bodyLargeMedium">
            {isEdit
              ? `Edit Step ${stepNumber || ""}`
              : `Add Step ${stepNumber || ""}`}
          </Text>
          <Icon
            name="x"
            variant="unfilled"
            size="md"
            color="onSurface"
            onPress={handleCancel}
            hitSlop="md"
          />
        </View>

        {/* Instruction Content */}
        <View style={{ marginBottom: theme.spacing.lg }}>
          <Text
            variant="bodyNormalBold"
            style={{ marginBottom: theme.spacing.sm }}
          >
            Instruction
          </Text>
          <Input
            variant="default"
            value={content}
            onChangeText={(text) => {
              setContent(text);
              if (error) setError("");
            }}
            placeholder="Describe this step in detail..."
            multiline
            fieldStyle={{
              height: 120,
              textAlignVertical: "top",
            }}
            error={!!error}
            autoFocus
          />
          {error && (
            <Text
              variant="bodySmallRegular"
              color="error"
              style={{ marginTop: theme.spacing.xs }}
            >
              {error}
            </Text>
          )}
          <Text
            variant="bodySmallRegular"
            color="onSurfaceVariant"
            style={{ marginTop: theme.spacing.sm }}
          >
            Be clear and specific about what to do in this step
          </Text>
        </View>

        {/* Image Upload */}
        <View style={{ marginBottom: theme.spacing.lg }}>
          <ImageUploadField
            label="Step Image (Optional)"
            value={imageUrl}
            onChange={setImageUrl}
            bucket="instruction-images"
            height={160}
            helpText="Add a photo to help visualize this step"
            placeholder="Add Step Image"
          />
        </View>

        {/* Action Buttons */}
        <View variant="row" style={{ gap: theme.spacing.sm }}>
          {isEdit && onDelete && (
            <Button
              variant="danger"
              size="md"
              onPress={handleDelete}
              style={{ flex: 1 }}
            >
              Delete
            </Button>
          )}
          <Button
            variant="outline"
            size="md"
            onPress={handleCancel}
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
            Save
          </Button>
        </View>
      </ScrollView>
    </Modal>
  );
};
