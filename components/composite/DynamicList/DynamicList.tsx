import React from "react";
import { Control, FieldValues, FieldPath } from "react-hook-form";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "@/theme/hooks/useTheme";
import { View, Text, Button } from "@/components/ui";
import { ItemFormField } from "@/components/composite";

interface DynamicListProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  fields: Record<"id", string>[];
  append: () => void;
  remove: (index: number) => void;
  max: number;
  placeholder?: string;
  // New props for custom field components
  customFieldComponent?: React.ComponentType<any>;
  customFieldProps?: any;
}

export const DynamicList = <T extends FieldValues>({
  control,
  name,
  label,
  fields,
  append,
  remove,
  max,
  placeholder,
  customFieldComponent: CustomField,
  customFieldProps,
}: DynamicListProps<T>) => {
  const { theme } = useTheme();

  return (
    <View margin="md">
      {/* Header with label and counter */}
      <View variant="row" style={{ marginBottom: 4 }}>
        <Text variant="bodyNormalBold">{label}</Text>
        <Text
          variant="bodySmallRegular"
          color="onSurfaceVariant"
          style={{ marginLeft: 4 }}
        >
          ({fields.length}/{max})
        </Text>
      </View>

      {/* Dynamic field list */}
      {fields.map((field, index) => (
        <View key={field.id}>
          {CustomField ? (
            // Custom field component branch
            <View variant="row" style={{ alignItems: "flex-start" }}>
              <View style={{ flex: 1 }}>
                <CustomField
                  control={control}
                  name={`${name}.${index}` as FieldPath<T>}
                  index={index}
                  {...customFieldProps}
                />
              </View>
              <Button
                variant="ghost"
                size="sm"
                onPress={() => remove(index)}
                style={{
                  marginLeft: 8,
                  marginTop: 8,
                  minWidth: 40,
                }}
              >
                <MaterialIcons
                  name="remove-circle"
                  size={20}
                  color={theme.colors.error}
                />
              </Button>
            </View>
          ) : (
            // Default simple field branch
            <View
              variant="row"
              style={{ marginBottom: 8, alignItems: "flex-start" }}
            >
              <View style={{ flex: 1 }}>
                <ItemFormField
                  control={control}
                  name={`${name}.${index}` as FieldPath<T>}
                  label=""
                  placeholder={placeholder}
                />
              </View>
              <Button
                variant="ghost"
                size="sm"
                onPress={() => remove(index)}
                style={{
                  marginLeft: 8,
                  marginTop: 24, // align with input field
                  minWidth: 40,
                }}
              >
                <MaterialIcons
                  name="remove-circle"
                  size={20}
                  color={theme.colors.error}
                />
              </Button>
            </View>
          )}
        </View>
      ))}

      {/* Add button */}
      {fields.length < max && (
        <Button
          variant="link"
          size="sm"
          onPress={append}
          style={{
            alignSelf: "flex-start",
            marginTop: 8,
          }}
        >
          <View variant="row" style={{ alignItems: "center" }}>
            <MaterialIcons
              name="add-circle"
              size={20}
              color={theme.colors.primary}
              style={{ marginRight: 4 }}
            />
            <Text variant="bodySmallMedium" color="primary">
              Add {label.toLowerCase()}
            </Text>
          </View>
        </Button>
      )}
    </View>
  );
};
