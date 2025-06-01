import React from "react";
import { Pressable } from "react-native";
import { Text, Scroll } from "@/components/ui";
import { useTheme } from "@/hooks/useTheme";

interface ToggleTextProps {
  options: string[];
  selected: string;
  onChange: (value: string) => void;
  maxOptions?: number;
}

export const ToggleText: React.FC<ToggleTextProps> = ({
  options,
  selected,
  onChange,
  maxOptions = 5,
}) => {
  const { theme } = useTheme();
  const visibleOptions = options.slice(0, maxOptions);

  return (
    <Scroll
      horizontal
      showsHorizontalScrollIndicator={false}
      backgroundColor="surfaceVariant"
      radius="xl"
      padding="xs"
      style={{ flexDirection: "row" }}
    >
      {visibleOptions.map((option) => {
        const isActive = option === selected;
        return (
          <Pressable
            key={option}
            onPress={() => onChange(option)}
            style={{
              paddingVertical: 8,
              paddingHorizontal: 16,
              borderRadius: theme.borderRadius.lg,
              backgroundColor: isActive
                ? theme.colors.primary
                : theme.colors.surfaceVariant,
              justifyContent: "center",
              alignItems: "center",
              marginRight: 4,
            }}
          >
            <Text
              variant="label"
              color={isActive ? "onPrimary" : "onSurfaceVariant"}
              fontWeight={isActive ? "bold" : "medium"}
            >
              {option}
            </Text>
          </Pressable>
        );
      })}
    </Scroll>
  );
};
