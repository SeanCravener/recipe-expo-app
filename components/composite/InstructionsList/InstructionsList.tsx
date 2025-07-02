import React, { useState } from "react";
import { Image, Alert } from "react-native";
import { useTheme } from "@/theme/hooks/useTheme";
import { View, Text, Icon, Button } from "@/components/ui";
import { InstructionModal } from "@/components/composite";

interface Instruction {
  content: string;
  "image-url": string;
}

interface InstructionsListProps {
  instructions: Instruction[];
  onAdd: (instruction: Instruction) => void;
  onEdit: (index: number, instruction: Instruction) => void;
  onDelete: (index: number) => void;
  disabled?: boolean;
  maxItems?: number;
  // New props for deferred upload
  deferUpload?: boolean;
  onInstructionImagePicked?: (index: number, uri: string) => void;
  localImageUris?: { [key: number]: string };
}

export const InstructionsList: React.FC<InstructionsListProps> = ({
  instructions,
  onAdd,
  onEdit,
  onDelete,
  disabled = false,
  maxItems = 15,
  deferUpload = false,
  onInstructionImagePicked,
  localImageUris = {},
}) => {
  const { theme } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [tempLocalImageUri, setTempLocalImageUri] = useState<string>("");

  const handleAddClick = () => {
    setEditingIndex(null);
    setTempLocalImageUri("");
    setModalVisible(true);
  };

  const handleEditClick = (index: number) => {
    setEditingIndex(index);
    setTempLocalImageUri(localImageUris[index] || "");
    setModalVisible(true);
  };

  const handleDeleteClick = (index: number) => {
    Alert.alert(
      "Delete Step",
      "Are you sure you want to remove this step?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => onDelete(index),
        },
      ],
      { cancelable: true }
    );
  };

  const handleSave = (instruction: Instruction) => {
    if (editingIndex !== null) {
      onEdit(editingIndex, instruction);
      // Update local image if changed
      if (
        deferUpload &&
        onInstructionImagePicked &&
        tempLocalImageUri !== localImageUris[editingIndex]
      ) {
        onInstructionImagePicked(editingIndex, tempLocalImageUri);
      }
    } else {
      onAdd(instruction);
      // Set local image for new instruction
      if (deferUpload && onInstructionImagePicked && tempLocalImageUri) {
        const newIndex = instructions.length;
        onInstructionImagePicked(newIndex, tempLocalImageUri);
      }
    }
    setModalVisible(false);
    setEditingIndex(null);
    setTempLocalImageUri("");
  };

  const handleDelete = () => {
    if (editingIndex !== null) {
      onDelete(editingIndex);
    }
    setModalVisible(false);
    setEditingIndex(null);
  };

  const canAddMore = instructions.length < maxItems;

  const renderInstruction = (instruction: Instruction, index: number) => {
    const stepNumber = index + 1;
    // Use local image if available, otherwise use the URL
    const displayImageUri = localImageUris[index] || instruction["image-url"];
    const hasImage = displayImageUri && displayImageUri.length > 0;

    return (
      <View
        key={index}
        style={{
          backgroundColor: theme.colors.surface,
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.outline,
          padding: theme.spacing.md,
          opacity: disabled ? 0.6 : 1,
        }}
      >
        <View variant="row" style={{ alignItems: "flex-start" }}>
          {/* Step Number */}
          <View
            style={{
              backgroundColor: theme.colors.primary,
              width: 28,
              height: 28,
              borderRadius: theme.borderRadius.full,
              alignItems: "center",
              justifyContent: "center",
              marginRight: theme.spacing.md,
              marginTop: theme.spacing.xs,
            }}
          >
            <Text variant="bodySmallBold" color="onPrimary">
              {stepNumber}
            </Text>
          </View>

          {/* Content Area */}
          <View style={{ flex: 1, marginRight: theme.spacing.sm }}>
            <View variant="row" style={{ marginBottom: theme.spacing.sm }}>
              {/* Thumbnail */}
              <View
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: theme.borderRadius.sm,
                  backgroundColor: hasImage
                    ? theme.colors.surface
                    : theme.colors.surfaceVariant,
                  marginRight: theme.spacing.md,
                  overflow: "hidden",
                }}
              >
                {hasImage ? (
                  <Image
                    source={{ uri: displayImageUri }}
                    style={{ width: "100%", height: "100%" }}
                    resizeMode="cover"
                  />
                ) : (
                  <View
                    style={{
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon
                      name="add-image"
                      variant="unfilled"
                      size="sm"
                      color="onSurfaceVariant"
                    />
                  </View>
                )}
              </View>

              {/* Instruction Text */}
              <View style={{ flex: 1 }}>
                <Text
                  variant="bodyNormalRegular"
                  numberOfLines={3}
                  style={{ lineHeight: 20 }}
                >
                  {instruction.content}
                </Text>
              </View>
            </View>
          </View>

          {/* Action Buttons */}
          <View
            variant="row"
            style={{
              gap: theme.spacing.xs,
              alignItems: "center",
            }}
          >
            <Icon
              name="trash"
              variant="unfilled"
              size="sm"
              color="error"
              onPress={disabled ? undefined : () => handleDeleteClick(index)}
              hitSlop="md"
            />
            <Icon
              name="edit-one"
              variant="unfilled"
              size="sm"
              color="onSurfaceVariant"
              onPress={disabled ? undefined : () => handleEditClick(index)}
              hitSlop="md"
            />
          </View>
        </View>
      </View>
    );
  };

  return (
    <>
      <View>
        {/* Instructions List */}
        {instructions.length === 0 ? (
          <View
            style={{
              padding: theme.spacing.lg,
              backgroundColor: theme.colors.surfaceVariant,
              borderRadius: theme.borderRadius.md,
              alignItems: "center",
              marginBottom: theme.spacing.md,
            }}
          >
            <Text variant="bodySmallRegular" color="onSurfaceVariant">
              No steps added yet
            </Text>
          </View>
        ) : (
          <View style={{ marginBottom: theme.spacing.md }}>
            {instructions.map((instruction, index) =>
              renderInstruction(instruction, index)
            )}
          </View>
        )}

        {/* Add Button */}
        <Button
          variant="outline"
          size="md"
          onPress={handleAddClick}
          disabled={disabled || !canAddMore}
          style={{ width: "100%" }}
        >
          <View variant="row" style={{ alignItems: "center", gap: 8 }}>
            <Icon name="add" variant="unfilled" size="sm" color="onSurface" />
            <Text variant="bodyNormalMedium">Add Step</Text>
          </View>
        </Button>

        {/* Max items reached message */}
        {!canAddMore && (
          <Text
            variant="bodySmallRegular"
            color="onSurfaceVariant"
            style={{
              marginTop: theme.spacing.sm,
              textAlign: "center",
              fontStyle: "italic",
            }}
          >
            Maximum {maxItems} steps reached
          </Text>
        )}
      </View>

      {/* Modal */}
      <InstructionModal
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false);
          setTempLocalImageUri("");
        }}
        onSave={handleSave}
        onDelete={editingIndex !== null ? handleDelete : undefined}
        initialValue={
          editingIndex !== null
            ? instructions[editingIndex]
            : { content: "", "image-url": "" }
        }
        isEdit={editingIndex !== null}
        stepNumber={
          editingIndex !== null ? editingIndex + 1 : instructions.length + 1
        }
        deferUpload={deferUpload}
        onImagePicked={setTempLocalImageUri}
        localImageUri={tempLocalImageUri}
      />
    </>
  );
};
