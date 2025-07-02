import React from "react";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";
import { View, Text, Input, Error } from "@/components/ui";
import { IconName } from "@/components/ui/Icon/Icon";

interface ItemFormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  placeholder?: string;
  multiline?: boolean;
  customOnChange?: (text: string) => void;
  // ENHANCEMENT: Add these modern props
  required?: boolean;
  helpText?: string;
  leftIcon?: IconName;
  rightIcon?: IconName;
  onLeftIconPress?: () => void;
  onRightIconPress?: () => void;
  disabled?: boolean;
  // Remove margin prop to make it more flexible
}

export const ItemFormField = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  multiline = false,
  customOnChange,
  required = false,
  helpText,
  leftIcon,
  rightIcon,
  onLeftIconPress,
  onRightIconPress,
  disabled = false,
}: ItemFormFieldProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <View style={{ marginBottom: 16 }}>
          {/* Consistent spacing */}
          {/* Label */}
          <View variant="row" style={{ marginBottom: 6 }}>
            <Text variant="bodyNormalBold">
              {label}
              {required && (
                <Text variant="bodyNormalBold" color="error">
                  *
                </Text>
              )}
            </Text>
          </View>
          {/* Help text */}
          {helpText && (
            <Text
              variant="bodySmallRegular"
              color="onSurfaceVariant"
              style={{ marginBottom: 8 }}
            >
              {helpText}
            </Text>
          )}
          {/* Input */}
          <Input
            variant="default"
            value={value || ""} // prevent undefined values
            onChangeText={(text) => {
              onChange(text);
              customOnChange?.(text);
            }}
            onBlur={onBlur}
            placeholder={placeholder}
            multiline={multiline}
            error={!!error} // Pass error state to Input
            disabled={disabled} // FIXED: Pass disabled state to Input
            leftIcon={leftIcon}
            rightIcon={rightIcon}
            onLeftIconPress={onLeftIconPress}
            onRightIconPress={onRightIconPress}
            fieldStyle={{
              height: multiline ? 100 : undefined,
              textAlignVertical: multiline ? "top" : "auto",
            }}
          />
          {/* Error message */}
          {error && (
            <View style={{ marginTop: 6 }}>
              <Error variant="text" message={error.message} />
            </View>
          )}
        </View>
      )}
    />
  );
};
