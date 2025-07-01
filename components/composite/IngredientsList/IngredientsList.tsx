import React, { useState } from "react";
import { Alert } from "react-native";
import { useTheme } from "@/theme/hooks/useTheme";
import { View, Text, Icon, Button } from "@/components/ui";
import { IngredientModal } from "@/components/composite";

interface IngredientsListProps {
  ingredients: { value: string }[];
  onAdd: (value: string) => void;
  onEdit: (index: number, value: string) => void;
  onDelete: (index: number) => void;
  disabled?: boolean;
  maxItems?: number;
}

export const IngredientsList: React.FC<IngredientsListProps> = ({
  ingredients,
  onAdd,
  onEdit,
  onDelete,
  disabled = false,
  maxItems = 20,
}) => {
  const { theme } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleAddClick = () => {
    setEditingIndex(null);
    setModalVisible(true);
  };

  const handleEditClick = (index: number) => {
    setEditingIndex(index);
    setModalVisible(true);
  };

  const handleDeleteClick = (index: number) => {
    Alert.alert(
      "Delete Ingredient",
      "Are you sure you want to remove this ingredient?",
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

  const handleSave = (value: string) => {
    if (editingIndex !== null) {
      onEdit(editingIndex, value);
    } else {
      onAdd(value);
    }
    setModalVisible(false);
    setEditingIndex(null);
  };

  const handleDelete = () => {
    if (editingIndex !== null) {
      onDelete(editingIndex);
    }
    setModalVisible(false);
    setEditingIndex(null);
  };

  const canAddMore = ingredients.length < maxItems;

  return (
    <>
      <View>
        {/* Ingredients List */}
        {ingredients.length === 0 ? (
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
              No ingredients added yet
            </Text>
          </View>
        ) : (
          <View style={{ marginBottom: theme.spacing.md }}>
            {ingredients.map((ingredient, index) => (
              <View
                key={index}
                variant="row"
                style={{
                  paddingVertical: theme.spacing.sm,
                  paddingHorizontal: theme.spacing.md,
                  backgroundColor: theme.colors.surface,
                  borderBottomWidth: 1,
                  borderBottomColor: theme.colors.outline,
                  alignItems: "center",
                  justifyContent: "space-between",
                  opacity: disabled ? 0.6 : 1,
                }}
              >
                <View style={{ flex: 1, marginRight: theme.spacing.md }}>
                  <Text variant="bodyNormalRegular">{ingredient.value}</Text>
                </View>
                <View variant="row" style={{ gap: theme.spacing.xs }}>
                  <Icon
                    name="trash"
                    variant="unfilled"
                    size="sm"
                    color="error"
                    onPress={
                      disabled ? undefined : () => handleDeleteClick(index)
                    }
                    hitSlop="md"
                  />
                  <Icon
                    name="edit-one"
                    variant="unfilled"
                    size="sm"
                    color="onSurfaceVariant"
                    onPress={
                      disabled ? undefined : () => handleEditClick(index)
                    }
                    hitSlop="md"
                  />
                </View>
              </View>
            ))}
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
            <Text variant="bodyNormalMedium">Add Ingredient</Text>
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
            Maximum {maxItems} ingredients reached
          </Text>
        )}
      </View>

      {/* Modal */}
      <IngredientModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSave}
        onDelete={editingIndex !== null ? handleDelete : undefined}
        initialValue={
          editingIndex !== null ? ingredients[editingIndex].value : ""
        }
        isEdit={editingIndex !== null}
      />
    </>
  );
};
