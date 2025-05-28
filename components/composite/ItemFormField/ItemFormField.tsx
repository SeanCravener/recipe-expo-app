import React from "react";
import { Control, Controller } from "react-hook-form";
import { useTheme } from "@/hooks/useTheme";
import { View, Text, Input } from "@/components/ui";

interface ItemFormFieldProps {
  control: Control<any>;
  name: string;
  label: string;
  placeholder?: string;
  multiline?: boolean;
  customOnChange?: (text: string) => void;
}

export const ItemFormField: React.FC<ItemFormFieldProps> = ({
  control,
  name,
  label,
  placeholder,
  multiline = false,
  customOnChange,
}) => {
  const { theme } = useTheme();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <View margin="md">
          <Text
            variant="label"
            fontWeight="bold"
            style={{ marginBottom: theme.spacing.xs }}
          >
            {label}
          </Text>
          <Input
            value={value}
            onChangeText={(text) => {
              onChange(text);
              customOnChange?.(text);
            }}
            placeholder={placeholder}
            multiline={multiline}
            style={{
              height: multiline ? 100 : undefined,
              textAlignVertical: multiline ? "top" : "auto",
            }}
          />
          {error && (
            <Text
              variant="label"
              color="error"
              style={{ marginTop: theme.spacing.xs }}
            >
              {error.message}
            </Text>
          )}
        </View>
      )}
    />
  );
};
