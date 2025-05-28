import React from "react";
import { Pressable } from "react-native";
import { Control } from "react-hook-form";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "@/hooks/useTheme";
import { View, Text } from "@/components/ui";
import { ItemFormField } from "@/components/composite";

interface DynamicListProps {
  control: Control<any>;
  name: string;
  label: string;
  fields: Record<"id", string>[];
  append: () => void;
  remove: (index: number) => void;
  max: number;
  placeholder?: string;
}

export const DynamicList: React.FC<DynamicListProps> = ({
  control,
  name,
  label,
  fields,
  append,
  remove,
  max,
  placeholder,
}) => {
  const { theme } = useTheme();

  return (
    <View margin="md">
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: theme.spacing.xs,
        }}
      >
        <Text variant="label" fontWeight="bold">
          {label}
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
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: theme.spacing.sm,
          }}
        >
          <View style={{ flex: 1 }}>
            <ItemFormField
              control={control}
              name={`${name}.${index}`}
              label=""
              placeholder={placeholder}
            />
          </View>
          <Pressable
            onPress={() => remove(index)}
            style={{
              marginLeft: theme.spacing.sm,
              padding: 4,
            }}
          >
            <MaterialIcons
              name="remove-circle"
              size={24}
              color={theme.colors.error}
            />
          </Pressable>
        </View>
      ))}

      {fields.length < max && (
        <Pressable
          onPress={append}
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: theme.spacing.xs,
            marginTop: theme.spacing.sm,
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
            Add {label.toLowerCase()}
          </Text>
        </Pressable>
      )}
    </View>
  );
};
