import React, { useCallback } from "react";
import { FlatList, FlatListProps } from "react-native";
import { ItemSummary } from "@/types/item";
import { ItemCard } from "@/components/composite";
import { View, Text, Loading } from "@/components/ui";
import { router } from "expo-router";

interface ItemListProps {
  data: ItemSummary[] | undefined; // Items to display
  isLoading: boolean; // Initial loading state
  isFetchingNextPage: boolean; // Loading state for next page
  hasNextPage: boolean; // Whether more pages exist
  fetchNextPage: () => void; // Function to load more items
  ListHeaderComponent?: FlatListProps<ItemSummary>["ListHeaderComponent"]; // Optional header
  emptyText?: string; // Custom text for empty state
}

export const ItemList = ({
  data,
  isLoading,
  isFetchingNextPage,
  hasNextPage,
  fetchNextPage,
  ListHeaderComponent,
  emptyText = "No items found",
}: ItemListProps) => {
  const renderItem = useCallback(
    ({ item }: { item: ItemSummary }) => (
      <ItemCard item={item} onPress={() => handleItemPress(item.id)} />
    ),
    []
  );

  const loadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const renderFooter = useCallback(() => {
    if (!isFetchingNextPage) return null;
    return <Loading size="small" />;
  }, [isFetchingNextPage]);

  const handleItemPress = (itemId: string) => {
    router.push(`/items/${itemId}`);
  };

  if (isLoading) {
    return <Loading size="small" />;
  }

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      ListHeaderComponent={ListHeaderComponent}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
      ListEmptyComponent={
        <View
          padding="md"
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text variant="md" align="center">
            {emptyText}
          </Text>
        </View>
      }
    />
  );
};
