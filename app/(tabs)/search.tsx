import React, { useState } from "react";
import { Stack } from "expo-router";
import { View, Text } from "@/components/ui";
import { useItems } from "@/hooks/useItems";
import { SearchBar, ItemList, SettingsButton } from "@/components/composite";
import { useDebouncedCallback } from "use-debounce";
import { useTheme } from "@/theme/hooks/useTheme";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Search() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState("");
  const {
    data: items,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useItems("search", searchQuery);

  const debouncedSearch = useDebouncedCallback((query: string) => {
    setSearchQuery(query);
  }, 300);

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Search",
          headerStyle: {
            backgroundColor: theme.colors.surface,
          },
          headerTintColor: theme.colors.onSurface,
          headerTitleStyle: {
            fontSize: theme.fontSize.lg,
            fontWeight: theme.fontWeight.bold as any,
          },
          headerShadowVisible: false, // Remove shadow for seamless look
          header: ({ options }) => (
            <View
              backgroundColor="surface"
              style={{
                paddingTop: insets.top, // Dynamic padding based on device
                boxShadow: "0px 0px 8px 1px #A1D9DD",
                borderBottomColor: theme.colors.primaryContainer,
                borderBottomWidth: 1,
              }}
            >
              {/* Title Row */}
              <View
                variant="row"
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 10,
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ width: 40 }} />
                <Text variant="bodyXLargeBold">{options.title}</Text>
                <SettingsButton size="lg" />
              </View>
              {/* Search Bar Row */}
              <View style={{ paddingHorizontal: 4 }}>
                <SearchBar
                  onSearch={debouncedSearch}
                  placeholder="Search recipes..."
                />
              </View>
            </View>
          ),
        }}
      />
      <View variant="padded-vertical" style={{ flex: 1 }}>
        {/* Fixed scrolling issue with flex style, need to come back to move search bar to header/top bar */}
        <ItemList
          data={items}
          isLoading={isLoading}
          isFetchingNextPage={isFetchingNextPage}
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
          emptyText={
            searchQuery
              ? "No items found for your search"
              : "Start typing to search items"
          }
        />
      </View>
    </>
  );
}
