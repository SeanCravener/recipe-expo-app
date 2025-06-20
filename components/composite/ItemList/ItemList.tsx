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
  const handleItemPress = useCallback((itemId: string) => {
    router.push(`/items/${itemId}`);
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: ItemSummary }) => (
      <ItemCard item={item} onPress={() => handleItemPress(item.id)} />
    ),
    [handleItemPress]
  );

  const loadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const renderFooter = useCallback(() => {
    if (!isFetchingNextPage) return null;
    return (
      <View style={{ padding: 16 }}>
        <Loading variant="spinner" />
      </View>
    );
  }, [isFetchingNextPage]);

  const renderEmptyComponent = useCallback(
    () => (
      <View variant="centered" padding="lg" style={{ flex: 1, minHeight: 200 }}>
        <Text
          variant="bodyNormalRegular"
          color="onSurfaceVariant"
          style={{ textAlign: "center" }}
        >
          {emptyText}
        </Text>
      </View>
    ),
    [emptyText]
  );

  if (isLoading) {
    return (
      <View variant="centered" style={{ flex: 1 }}>
        <Loading variant="spinner" />
      </View>
    );
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
      ListEmptyComponent={renderEmptyComponent}
      contentContainerStyle={
        !data || data.length === 0 ? { flex: 1 } : { paddingBottom: 20 }
      }
      style={{ flex: 1 }}
      removeClippedSubviews={false}
      initialNumToRender={10}
      maxToRenderPerBatch={5}
      windowSize={10}
    />
  );
};
