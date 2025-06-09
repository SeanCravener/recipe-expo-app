import React from "react";
import { Control, FieldValues, FieldPath } from "react-hook-form";
import { View, Text } from "@/components/ui";
import { ItemFormField, ImageUploadField } from "@/components/composite";

interface InstructionFormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  index: number;
  setValue: (name: FieldPath<T>, value: any) => void;
  watch: (name: FieldPath<T>) => any;
}

export const InstructionFormField = <T extends FieldValues>({
  control,
  name,
  index,
  setValue,
  watch,
}: InstructionFormFieldProps<T>) => {
  return (
    <View
      variant="content"
      backgroundColor="surfaceVariant"
      style={{ marginBottom: 16 }}
    >
      <Text variant="bodySmallBold" style={{ marginBottom: 8 }}>
        Step {index + 1}
      </Text>

      <ItemFormField
        control={control}
        name={`${name}.content` as FieldPath<T>}
        label=""
        placeholder="Enter instruction"
        multiline
      />

      <ImageUploadField
        label="Step Image (Optional)"
        value={watch(`${name}.image-url` as FieldPath<T>)}
        onChange={(url) => setValue(`${name}.image-url` as FieldPath<T>, url)}
        bucket="instruction-images"
      />
    </View>
  );
};
