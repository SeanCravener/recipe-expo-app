import { View, Text, StyleSheet } from "react-native";

interface IngredientsListProps {
  ingredients: string[];
}

export function IngredientsList({ ingredients }: IngredientsListProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Ingredients</Text>
        <Text style={styles.count}>({ingredients.length})</Text>
      </View>
      {ingredients.map((ingredient, index) => (
        <Text key={index} style={styles.ingredient}>
          • {ingredient}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
  },
  count: {
    marginLeft: 8,
    fontSize: 16,
    color: "#666",
  },
  ingredient: {
    fontSize: 16,
    marginBottom: 8,
    lineHeight: 24,
  },
});
