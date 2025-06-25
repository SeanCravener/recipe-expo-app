import React from "react";
import { Controller, Control, FieldValues, FieldPath } from "react-hook-form";
import { StyleProp, ViewStyle } from "react-native";
import { useCategories } from "@/hooks/useCategories";
import { useTheme } from "@/theme/hooks/useTheme";
import { View, Text, ToggleText, Loading, Error } from "@/components/ui";

interface CategorySelectProps<T extends FieldValues = any> {
  control: Control<T>;
  name?: FieldPath<T>;
  label?: string;
  disabled?: boolean;
  required?: boolean;
  helpText?: string;
  style?: StyleProp<ViewStyle>;
}

export const CategorySelect = <T extends FieldValues = any>({
  control,
  name = "category_id" as FieldPath<T>,
  label = "Category",
  disabled = false,
  required = false,
  helpText,
  style,
}: CategorySelectProps<T>) => {
  const { theme } = useTheme();
  const { data: categories, isLoading, error } = useCategories();

  if (isLoading) {
    return (
      <View style={[{ marginBottom: theme.spacing.lg }, style]}>
        <Text
          variant="bodyNormalBold"
          style={{ marginBottom: theme.spacing.sm }}
        >
          {label}
          {required && (
            <Text variant="bodyNormalBold" color="error">
              {" "}
              *
            </Text>
          )}
        </Text>
        <View variant="centered" style={{ paddingVertical: theme.spacing.lg }}>
          <Loading variant="spinner" />
          <Text
            variant="bodySmallRegular"
            color="onSurfaceVariant"
            style={{ marginTop: theme.spacing.sm }}
          >
            Loading categories...
          </Text>
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[{ marginBottom: theme.spacing.lg }, style]}>
        <Text
          variant="bodyNormalBold"
          style={{ marginBottom: theme.spacing.sm }}
        >
          {label}
          {required && (
            <Text variant="bodyNormalBold" color="error">
              {" "}
              *
            </Text>
          )}
        </Text>
        <Error
          variant="box"
          message="Failed to load categories. Please try again."
        />
      </View>
    );
  }

  if (!categories || categories.length === 0) {
    return (
      <View style={[{ marginBottom: theme.spacing.lg }, style]}>
        <Text
          variant="bodyNormalBold"
          style={{ marginBottom: theme.spacing.sm }}
        >
          {label}
          {required && (
            <Text variant="bodyNormalBold" color="error">
              {" "}
              *
            </Text>
          )}
        </Text>
        <Text variant="bodySmallRegular" color="onSurfaceVariant">
          No categories available
        </Text>
      </View>
    );
  }

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { value, onChange },
        fieldState: { error: fieldError },
      }) => (
        <View style={[{ marginBottom: theme.spacing.lg }, style]}>
          {/* Label */}
          <View style={{ marginBottom: theme.spacing.sm }}>
            <Text variant="bodyNormalBold" style={{ marginBottom: 4 }}>
              {label}
              {required && (
                <Text variant="bodyNormalBold" color="error">
                  {" "}
                  *
                </Text>
              )}
            </Text>

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

          {/* Category Pills */}
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              gap: theme.spacing.sm,
              opacity: disabled ? 0.6 : 1,
            }}
          >
            {categories.map((category) => {
              const selected = value === category.id;
              return (
                <ToggleText
                  key={category.id}
                  variant="pill"
                  active={selected}
                  onPress={disabled ? undefined : () => onChange(category.id)}
                  disabled={disabled}
                  style={{
                    borderColor: fieldError ? theme.colors.error : undefined,
                  }}
                >
                  {category.category}
                </ToggleText>
              );
            })}
          </View>

          {/* Error message */}
          {fieldError && (
            <View style={{ marginTop: theme.spacing.sm }}>
              <Error variant="text" message={fieldError.message} />
            </View>
          )}
        </View>
      )}
    />
  );
};
