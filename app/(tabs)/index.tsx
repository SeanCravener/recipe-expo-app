import React from "react";
import { Stack } from "expo-router";
import { useItems } from "@/hooks/useItems";
import { ItemList, SettingsButton } from "@/components/composite";
import { View, Text } from "@/components/ui";
import { useTheme } from "@/theme/hooks/useTheme";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Home() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  const {
    data: items,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useItems("general");

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Home",
          header: ({ options }) => (
            <View
              backgroundColor="surface"
              style={{
                paddingTop: insets.top, // Dynamic padding based on device
                boxShadow: "0px 0px 8px 1px #A1D9DD",
                borderRadius: 0,
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
                <Text variant="headerThree">{options.title}</Text>
                <SettingsButton size="lg" />
              </View>
            </View>
          ),
        }}
      />
      <View style={{ flex: 1 }}>
        <ItemList
          data={items}
          isLoading={isLoading}
          isFetchingNextPage={isFetchingNextPage}
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
          emptyText="No items found"
        />
      </View>
    </>
  );
}
