import React, { useState, useEffect } from "react";
import { useTheme } from "@/theme/hooks/useTheme";
import { Modal, View, Text, Input, Button, Icon } from "@/components/ui";

interface IngredientModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (value: string) => void;
  onDelete?: () => void;
  initialValue?: string;
  isEdit?: boolean;
}

export const IngredientModal: React.FC<IngredientModalProps> = ({
  visible,
  onClose,
  onSave,
  onDelete,
  initialValue = "",
  isEdit = false,
}) => {
  const { theme } = useTheme();
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState("");

  // Reset value when modal opens
  useEffect(() => {
    if (visible) {
      setValue(initialValue);
      setError("");
    }
  }, [visible, initialValue]);

  const handleSave = () => {
    const trimmedValue = value.trim();
    if (!trimmedValue) {
      setError("Ingredient cannot be empty");
      return;
    }
    onSave(trimmedValue);
    setValue("");
    onClose();
  };

  const handleCancel = () => {
    setValue("");
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
        maxWidth: 400,
        padding: theme.spacing.lg,
      }}
    >
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
          {isEdit ? "Edit Ingredient" : "Add Ingredient"}
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

      {/* Input Field */}
      <View style={{ marginBottom: theme.spacing.lg }}>
        <Input
          variant="default"
          value={value}
          onChangeText={(text) => {
            setValue(text);
            if (error) setError("");
          }}
          placeholder="e.g., 2 cups flour"
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
          Include quantity and unit (e.g., "250g butter", "1 tsp salt")
        </Text>
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
    </Modal>
  );
};
