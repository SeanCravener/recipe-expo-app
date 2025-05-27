// components/composites/FilterSortBar.tsx
import React from "react";
import { Pressable, ScrollView } from "react-native";
import { useTheme } from "../../../hooks/useTheme";
import { Text, View } from "../../ui";

interface FilterSortBarProps {
  filters: string[];
  selectedFilter?: string;
  onFilterChange?: (filter: string) => void;
  sortOptions?: string[];
  selectedSort?: string;
  onSortChange?: (sort: string) => void;
}

export const FilterSortBar: React.FC<FilterSortBarProps> = ({
  filters,
  selectedFilter,
  onFilterChange,
  sortOptions = [],
  selectedSort,
  onSortChange,
}) => {
  const { theme } = useTheme();

  return (
    <View style={{ marginBottom: theme.spacing.md }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={{ flexDirection: "row", gap: theme.spacing.sm }}>
          {filters.map((filter) => {
            const isSelected = selectedFilter === filter;
            return (
              <Pressable
                key={filter}
                onPress={() => onFilterChange?.(filter)}
                style={{
                  paddingVertical: 6,
                  paddingHorizontal: 12,
                  borderRadius: theme.borderRadius.sm,
                  backgroundColor: isSelected
                    ? theme.colors.primary
                    : theme.colors.surfaceVariant,
                }}
              >
                <Text
                  variant="label"
                  color={isSelected ? "onPrimary" : "onSurfaceVariant"}
                >
                  {filter}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>

      {sortOptions.length > 0 && (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: theme.spacing.sm,
          }}
        >
          <Text
            variant="label"
            color="onSurfaceVariant"
            style={{ marginRight: theme.spacing.sm }}
          >
            Sort by:
          </Text>
          {sortOptions.map((option) => {
            const isSelected = selectedSort === option;
            return (
              <Pressable
                key={option}
                onPress={() => onSortChange?.(option)}
                style={{
                  marginRight: theme.spacing.sm,
                  paddingVertical: 4,
                  paddingHorizontal: 10,
                  borderRadius: theme.borderRadius.sm,
                  backgroundColor: isSelected
                    ? theme.colors.primary
                    : theme.colors.surfaceVariant,
                }}
              >
                <Text
                  variant="label"
                  color={isSelected ? "onPrimary" : "onSurfaceVariant"}
                >
                  {option}
                </Text>
              </Pressable>
            );
          })}
        </View>
      )}
    </View>
  );
};
