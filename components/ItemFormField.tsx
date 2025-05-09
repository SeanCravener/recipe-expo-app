import { View, Text, TextInput, StyleSheet } from "react-native";
import { Control, Controller } from "react-hook-form";

interface ItemFormFieldProps {
  control: Control<any>;
  name: string;
  label: string;
  placeholder?: string;
  multiline?: boolean;
  customOnChange?: (text: string) => void;
}

export function ItemFormField({
  control,
  name,
  label,
  placeholder,
  multiline,
  customOnChange,
}: ItemFormFieldProps) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <View style={styles.container}>
          {label && <Text style={styles.label}>{label}</Text>}
          <TextInput
            style={[
              styles.input,
              multiline && styles.multilineInput,
              error && styles.inputError,
            ]}
            value={value}
            onChangeText={(text) => {
              onChange(text);
              if (customOnChange) {
                customOnChange(text);
              }
            }}
            placeholder={placeholder}
            multiline={multiline}
          />
          {error && <Text style={styles.errorText}>{error.message}</Text>}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  multilineInput: {
    height: 100,
    textAlignVertical: "top",
  },
  inputError: {
    borderColor: "#FF3B30",
  },
  errorText: {
    color: "#FF3B30",
    fontSize: 14,
    marginTop: 4,
  },
});
