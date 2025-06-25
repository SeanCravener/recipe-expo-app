import React from "react";
import { Control, FieldValues, FieldPath } from "react-hook-form";
import { useTheme } from "@/theme/hooks/useTheme";
import { View, Text, Icon } from "@/components/ui";
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
  // Enhanced props
  customFieldComponent?: React.ComponentType<any>;
  customFieldProps?: any;
  disabled?: boolean;
  helpText?: string;
  showCounter?: boolean;
  addButtonText?: string;
  removeButtonAccessibilityLabel?: string;
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
  disabled = false,
  helpText,
  showCounter = true,
  addButtonText,
  removeButtonAccessibilityLabel,
}: DynamicListProps<T>) => {
  const { theme } = useTheme();

  // Memoized add button text
  const defaultAddButtonText = React.useMemo(
    () => addButtonText || `Add ${label.toLowerCase().slice(0, -1)}`, // Remove 's' from plural
    [addButtonText, label]
  );

  // Memoized accessibility label
  const defaultRemoveLabel = React.useMemo(
    () =>
      removeButtonAccessibilityLabel ||
      `Remove ${label.toLowerCase().slice(0, -1)}`,
    [removeButtonAccessibilityLabel, label]
  );

  // Check if we can add more items
  const canAddMore = fields.length < max && !disabled;

  return (
    <View style={{ marginBottom: theme.spacing.lg }}>
      {/* Header with label, counter, and help text */}
      <View style={{ marginBottom: theme.spacing.sm }}>
        <View variant="row" style={{ alignItems: "center", marginBottom: 4 }}>
          <Text variant="bodyNormalBold">{label}</Text>
          {showCounter && (
            <Text
              variant="bodySmallRegular"
              color="onSurfaceVariant"
              style={{ marginLeft: theme.spacing.xs }}
            >
              ({fields.length}/{max})
            </Text>
          )}
        </View>

        {helpText && (
          <Text
            variant="bodySmallRegular"
            color="onSurfaceVariant"
            style={{ marginTop: 2 }}
          >
            {helpText}
          </Text>
        )}
      </View>

      {/* Dynamic field list */}
      {fields.map((field, index) => (
        <View
          key={field.id}
          style={{
            marginBottom: theme.spacing.sm,
            opacity: disabled ? 0.6 : 1,
          }}
        >
          {CustomField ? (
            // Custom field component branch
            <View variant="row" style={{ alignItems: "flex-start" }}>
              <View style={{ flex: 1 }}>
                <CustomField
                  control={control}
                  name={`${name}.${index}` as FieldPath<T>}
                  index={index}
                  disabled={disabled}
                  {...customFieldProps}
                />
              </View>

              {/* Remove button */}
              <View
                style={{
                  marginLeft: theme.spacing.sm,
                  marginTop: theme.spacing.sm,
                  minWidth: 44,
                  minHeight: 44,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Icon
                  name="edit-three" // Use as close/remove icon
                  variant="unfilled"
                  size="md"
                  color={disabled ? "onSurfaceVariant" : "error"}
                  onPress={disabled ? undefined : () => remove(index)}
                  hitSlop="md"
                />
              </View>
            </View>
          ) : (
            // Default simple field branch
            <View variant="row" style={{ alignItems: "flex-start" }}>
              <View style={{ flex: 1 }}>
                <ItemFormField
                  control={control}
                  name={`${name}.${index}.value` as FieldPath<T>} // Fixed: added .value for ingredient structure
                  label=""
                  placeholder={placeholder}
                  disabled={disabled}
                />
              </View>

              {/* Remove button */}
              <View
                style={{
                  marginLeft: theme.spacing.sm,
                  marginTop: theme.spacing.lg, // Align with input field
                  minWidth: 44,
                  minHeight: 44,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Icon
                  name="edit-three" // Use as close/remove icon
                  variant="unfilled"
                  size="md"
                  color={disabled ? "onSurfaceVariant" : "error"}
                  onPress={disabled ? undefined : () => remove(index)}
                  hitSlop="md"
                />
              </View>
            </View>
          )}
        </View>
      ))}

      {/* Add button */}
      {canAddMore && (
        <View
          style={{
            marginTop: fields.length > 0 ? theme.spacing.sm : 0,
            alignSelf: "flex-start",
          }}
        >
          <View
            variant="row"
            style={{
              alignItems: "center",
              paddingVertical: theme.spacing.sm,
              paddingHorizontal: theme.spacing.sm,
            }}
          >
            <Icon
              name="add"
              variant="unfilled"
              size="md"
              color="primary"
              onPress={append}
              hitSlop="md"
              style={{ marginRight: theme.spacing.xs }}
            />
            <Text
              variant="bodySmallMedium"
              color="primary"
              onPress={append} // Make text clickable too
            >
              {defaultAddButtonText}
            </Text>
          </View>
        </View>
      )}

      {/* Show message when max reached */}
      {fields.length >= max && (
        <Text
          variant="bodySmallRegular"
          color="onSurfaceVariant"
          style={{
            marginTop: theme.spacing.sm,
            fontStyle: "italic",
          }}
        >
          Maximum {max} {label.toLowerCase()} reached
        </Text>
      )}
    </View>
  );
};
