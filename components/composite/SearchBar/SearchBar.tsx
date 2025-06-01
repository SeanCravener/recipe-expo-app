import React, { useState } from "react";
import { Pressable, Keyboard, StyleProp, ViewStyle } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { Input, View } from "@/components/ui";
import { MaterialIcons } from "@expo/vector-icons";

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onSearch: (query: string) => void;
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

  const handleSubmit = () => {
    onSearch(localValue.trim());
  };

  const handleClear = () => {
    setValue("");
    onSearch?.("");
    Keyboard.dismiss();
  };

  return (
    <View
      backgroundColor="background"
      style={[{ padding: theme.spacing.sm }, style]}
    >
      <View
        backgroundColor="primary"
        padding="sm"
        borderRadius="md"
        margin="md"
        style={[
          {
            flexDirection: "row",
            alignItems: "center",
          },
          style,
        ]}
      >
        <MaterialIcons
          name="search"
          size={24}
          color={theme.colors.onPrimary}
          style={{ marginRight: theme.spacing.sm }}
        />
        <Input
          placeholder={placeholder}
          value={searchValue}
          onChangeText={setValue}
          onSubmitEditing={handleSubmit}
          // variant="filled"
          containerStyle={{ flex: 1 }}
          clearButtonMode="while-editing"
          returnKeyType="search"
        />
        {searchValue.length > 0 && (
          <Pressable
            onPress={handleClear}
            style={{ padding: theme.spacing.sm }}
          >
            <MaterialIcons
              name="clear"
              size={20}
              color={theme.colors.onPrimary}
            />
          </Pressable>
        )}
      </View>
    </View>
  );
};
