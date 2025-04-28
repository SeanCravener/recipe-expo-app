import React, { useCallback } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Text,
  FlatListProps,
} from "react-native";
import { ItemCard } from "../components/ItemCard";
import { ItemSummary } from "../types/item";

interface ItemListProps {
  data: ItemSummary[] | undefined; // Items to display
  isLoading: boolean; // Initial loading state
  isFetchingNextPage: boolean; // Loading state for next page
  hasNextPage: boolean; // Whether more pages exist
  fetchNextPage: () => void; // Function to load more items
  ListHeaderComponent?: FlatListProps<ItemSummary>["ListHeaderComponent"]; // Optional header
  emptyText?: string; // Custom text for empty state
}

const ItemList = ({
  data,
  isLoading,
  isFetchingNextPage,
  hasNextPage,
  fetchNextPage,
  ListHeaderComponent,
  emptyText = "No items found",
}: ItemListProps) => {
  const renderItem = useCallback(
    ({ item }: { item: ItemSummary }) => <ItemCard item={item} />,
    []
  );

  const loadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const renderFooter = useCallback(() => {
    if (!isFetchingNextPage) return null;
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="small" color="#007AFF" />
      </View>
    );
  }, [isFetchingNextPage]);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      ListHeaderComponent={ListHeaderComponent}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
      showsVerticalScrollIndicator={false}
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>{emptyText}</Text>
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    paddingVertical: 12,
  },
  footer: {
    paddingVertical: 16,
    alignItems: "center",
  },
  emptyContainer: {
    flex: 1,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
});

export default ItemList;
