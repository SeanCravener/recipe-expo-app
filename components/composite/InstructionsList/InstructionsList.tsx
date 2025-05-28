import React from "react";
import { Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Control } from "react-hook-form";
import { useTheme } from "@/hooks/useTheme";
import { View, Text } from "@/components/ui";
import { ItemFormField, ImageUploadField } from "@/components/composite";
import { ItemFormData } from "@/types/item";

interface InstructionsListProps {
  control: Control<ItemFormData>;
  fields: Record<"id", string>[];
  append: () => void;
  remove: (index: number) => void;
  max: number;
}

export const InstructionsList: React.FC<InstructionsListProps> = ({
  control,
  fields,
  append,
  remove,
  max,
}) => {
  const { theme } = useTheme();

  return (
    <View margin="md">
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: theme.spacing.sm,
        }}
      >
        <Text variant="title" fontWeight="bold">
          Instructions
        </Text>
        <Text
          variant="label"
          color="onSurfaceVariant"
          style={{ marginLeft: theme.spacing.xs }}
        >
          ({fields.length}/{max})
        </Text>
      </View>

      {fields.map((field, index) => (
        <View
          key={field.id}
          backgroundColor="surfaceContainerLowest"
          padding="md"
          borderRadius="md"
          style={{ marginBottom: theme.spacing.lg }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: theme.spacing.sm,
            }}
          >
            <Text variant="label" fontWeight="bold">
              Step {index + 1}
            </Text>
            <Pressable
              onPress={() => remove(index)}
              style={{ padding: theme.spacing.xs }}
            >
              <MaterialIcons
                name="remove-circle"
                size={24}
                color={theme.colors.error}
              />
            </Pressable>
          </View>

          <ItemFormField
            control={control}
            name={`instructions.${index}.content`}
            label="Instruction"
            placeholder="Enter instruction"
            multiline
          />

          <ImageUploadField
            label="Step Image (Optional)"
            value={
              control._formValues?.instructions?.[index]?.["image-url"] || ""
            }
            onChange={(url) => {
              const instructions = [
                ...(control._formValues?.instructions || []),
              ];
              if (!instructions[index]) {
                instructions[index] = { content: "", "image-url": "" };
              }
              instructions[index]["image-url"] = url;
              control._formValues.instructions = instructions;
            }}
          />
        </View>
      ))}

      {fields.length < max && (
        <Pressable
          onPress={append}
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: theme.spacing.xs,
          }}
        >
          <MaterialIcons
            name="add-circle"
            size={24}
            color={theme.colors.primary}
          />
          <Text
            variant="label"
            color="primary"
            style={{ marginLeft: theme.spacing.xs }}
          >
            Add step
          </Text>
        </Pressable>
      )}
    </View>
  );
};
