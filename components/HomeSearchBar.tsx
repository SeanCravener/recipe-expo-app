import { View, Pressable, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";

export function HomeSearchBar() {
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.searchContainer}
        onPress={() => router.push("/(tabs)/search")}
      >
        <MaterialIcons
          name="search"
          size={24}
          color="#666"
          style={styles.icon}
        />
        <View style={styles.fakeInput}>
          <MaterialIcons name="search" size={20} color="#666" />
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: "white",
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
  },
  icon: {
    marginRight: 8,
  },
  fakeInput: {
    flex: 1,
    justifyContent: "center",
  },
});
