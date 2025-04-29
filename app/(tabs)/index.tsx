import { View, Text, StyleSheet } from "react-native";
import { useItems } from "../../hooks/useItems"; // Adjust path as needed
import { HomeSearchBar } from "../../components/HomeSearchBar"; // Adjust path as needed
import ItemList from "../../components/ItemList"; // Adjust path as needed

export default function Home() {
  const {
    data: items,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useItems("general");

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.welcome}>Welcome!</Text>
      <HomeSearchBar />
    </View>
  );

  return (
    <View style={styles.container}>
      <ItemList
        data={items}
        isLoading={isLoading}
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
        ListHeaderComponent={renderHeader}
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
