import { Text, StyleSheet } from "react-native";
import { useItems } from "../../hooks/useItems"; // Adjust path as needed
import { ItemList, SearchBar } from "../../components/composite"; // Adjust path as needed
import { View } from "../../components/ui"; // Adjust path as needed

export default function Home() {
  const {
    data: items,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useItems("general");

  // const renderHeader = () => (
  //   <View style={styles.header}>
  //     <Text style={styles.welcome}>Welcome!</Text>
  //     <SearchBar />
  //   </View>
  // );

  return (
    <View backgroundColor="surfaceContainer" style={{ flex: 1 }}>
      <ItemList
        data={items}
        isLoading={isLoading}
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
        // ListHeaderComponent={renderHeader}
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
  header: {
    backgroundColor: "white",
  },
  welcome: {
    fontSize: 24,
    fontWeight: "bold",
    padding: 16,
    paddingBottom: 8,
  },
});
