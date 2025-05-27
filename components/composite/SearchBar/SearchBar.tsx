// components/composites/SearchBar.tsx
import React, { useState } from "react";
import { Keyboard, StyleProp, ViewStyle } from "react-native";
import { useTheme } from "../../../hooks/useTheme";
import { Icon, Input, View } from "../../ui/index";

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onSearch?: (query: string) => void;
  style?: StyleProp<ViewStyle>;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search...",
  value,
  onChangeText,
  onSearch,
  style,
}) => {
  const { theme } = useTheme();
  const [localValue, setLocalValue] = useState("");

  const searchValue = value !== undefined ? value : localValue;
  const setValue = onChangeText ?? setLocalValue;

  const handleClear = () => {
    setValue("");
    onSearch?.("");
    Keyboard.dismiss();
  };

  return (
    <View
      backgroundColor="surfaceContainer"
      padding="sm"
      borderRadius="md"
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
        },
        style,
      ]}
    >
      <Icon
        name="search"
        size={20}
        color="onSurfaceVariant"
        style={{ marginRight: theme.spacing.sm }}
      />
      <Input
        placeholder={placeholder}
        value={searchValue}
        onChangeText={setValue}
        onSubmitEditing={() => onSearch?.(searchValue)}
        variant="unstyled"
        style={{ flex: 1 }}
      />
      {searchValue.length > 0 && (
        <Icon
          name="x"
          size={20}
          color="onSurfaceVariant"
          onPress={handleClear}
          style={{ marginLeft: theme.spacing.sm }}
        />
      )}
    </View>
  );
};
