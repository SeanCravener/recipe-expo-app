//
//  TODO:
//    1. Fix styling that I did when messing around with shadows.
//    2. Figure out new styling/shadow.
//    3. Add functional Filter Button that brings up modal from bottom.
//    4. Adjust font in search bar and change MaterialIcons to svg Icon in Assets/Icons.
//      Might have to tweak Input component further.
//    5. Add Settings Button.? Keep?
//

import React, { useState } from "react";
import { Keyboard, StyleProp, ViewStyle } from "react-native";
import { useTheme } from "@/theme/hooks/useTheme";
import { Input, View, Button } from "@/components/ui";
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
    onSearch(searchValue.trim());
    Keyboard.dismiss();
  };

  const handleClear = () => {
    setValue("");
    onSearch("");
    Keyboard.dismiss();
  };

  return (
    <View style={style}>
      <View
        backgroundColor="primaryContainer"
        borderRadius="md"
        // Messed around with styling input container for search, need to finalize later
        // this is just temporary
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 4,
          borderWidth: 1,
          boxShadow: "0px 0px 6px 4px #5EA6AB inset",
          borderColor: theme.colors.onPrimaryContainer,
          marginHorizontal: theme.spacing.sm,
          paddingHorizontal: theme.spacing.md,
          paddingVertical: theme.spacing.sm,
        }}
      >
        <MaterialIcons
          name="search"
          size={20}
          color={theme.colors.onSurfaceVariant}
        />

        <Input
          variant="default"
          placeholder={placeholder}
          value={searchValue}
          onChangeText={setValue}
          onSubmitEditing={handleSubmit}
          containerStyle={{
            flex: 1,
            borderWidth: 0, // remove border since we're in a container
            backgroundColor: "transparent",
          }}
          fieldStyle={{
            fontSize: 16,
          }}
          returnKeyType="search"
          autoCapitalize="none"
          autoCorrect={false}
        />

        {searchValue.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onPress={handleClear}
            style={{
              minWidth: 32,
              minHeight: 32,
              padding: 4,
            }}
          >
            <MaterialIcons
              name="clear"
              size={18}
              color={theme.colors.onSurfaceVariant}
            />
          </Button>
        )}
      </View>
    </View>
  );
};
