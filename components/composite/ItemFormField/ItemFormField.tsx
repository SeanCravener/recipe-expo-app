import React from "react";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";
import { View, Text, Input, Error } from "@/components/ui";

interface ItemFormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  placeholder?: string;
  multiline?: boolean;
  customOnChange?: (text: string) => void;
}

export const ItemFormField = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  multiline = false,
  customOnChange,
}: ItemFormFieldProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <View margin="md">
          <Text
            variant="bodyNormalBold"
            style={{ marginBottom: 4 }} // tight spacing for labels
          >
            {label}
          </Text>
          <Input
            variant="default"
            value={value || ""} // prevent undefined values
            onChangeText={(text) => {
              onChange(text);
              customOnChange?.(text);
            }}
            placeholder={placeholder}
            multiline={multiline}
            fieldStyle={{
              height: multiline ? 100 : undefined,
              textAlignVertical: multiline ? "top" : "auto",
            }}
          />
          {error && (
            <View style={{ marginTop: 4 }}>
              <Error variant="text" message={error.message} />
            </View>
          )}
        </View>
      )}
    />
  );
};
