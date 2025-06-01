import { Text, StyleSheet } from "react-native";
import { useItems } from "../../hooks/useItems";
import { ItemList, SearchBar } from "../../components/composite";
import { View } from "../../components/ui";

export default function Home() {
  const {
    data: items,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useItems("general");

  return (
    <View backgroundColor="surfaceContainer" style={{ flex: 1 }}>
      <ItemList
        data={items}
        isLoading={isLoading}
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
        emptyText="No items found"
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
