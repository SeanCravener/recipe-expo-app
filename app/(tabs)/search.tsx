import { View, StyleSheet } from "react-native";
import { useItems } from "../../hooks/useItems";
import { SearchBar, ItemList } from "../../components/composite";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export default function Search() {
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
    <View style={styles.container}>
      <SearchBar onSearch={debouncedSearch} />
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
});
