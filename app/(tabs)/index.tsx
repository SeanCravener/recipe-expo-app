import {
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Text,
} from "react-native";
import { useItems } from "../../hooks/useItems";
import { ItemCard } from "../../components/ItemCard";
import { HomeSearchBar } from "../../components/HomeSearchBar";
import { useCallback } from "react";

export default function Home() {
  const { items, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useItems();

  const renderItem = useCallback(({ item }) => <ItemCard item={item} />, []);

  const loadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const renderHeader = useCallback(
    () => (
      <View style={styles.header}>
        <Text style={styles.welcome}>Welcome!</Text>
        <HomeSearchBar />
      </View>
    ),
    []
  );

  const renderFooter = useCallback(() => {
    if (!isFetchingNextPage) return null;
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="small" />
      </View>
    );
  }, [isFetchingNextPage]);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={renderItem}
        ListHeaderComponent={renderHeader}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    backgroundColor: "white",
  },
  welcome: {
    fontSize: 24,
    fontWeight: "bold",
    padding: 16,
    paddingBottom: 8,
  },
  list: {
    paddingBottom: 12,
  },
  footer: {
    paddingVertical: 16,
    alignItems: "center",
  },
});
