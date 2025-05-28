// components/composites/ItemCard.tsx
import React from "react";
import { Pressable } from "react-native";
import { useTheme } from "../../../hooks/useTheme";
import { Image, Text, View } from "../../ui";
import { FavoriteButton, RatingDisplay } from "../index";
import { ItemSummary } from "@/types/item";

interface ItemCardProps {
  item: ItemSummary;
  onPress?: () => void;
}

export const ItemCard: React.FC<ItemCardProps> = ({ item, onPress }) => {
  const { theme } = useTheme();

  return (
    <Pressable onPress={onPress} style={{ width: "100%" }}>
      <View
        backgroundColor="surface"
        borderRadius="lg"
        padding="sm"
        margin="sm"
        elevation="level3"
        style={{ flexDirection: "row", overflow: "hidden" }}
      >
        <Image
          source={{ uri: item.main_image }}
          radius="md"
          style={{ width: 80, height: 80 }}
        />

        <View padding="md" style={{ flex: 1, justifyContent: "space-between" }}>
          <View>
            <Text variant="md" fontWeight="bold" style={{ marginBottom: 4 }}>
              {item.title}
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text variant="md" fontWeight="regular">
              {item.category || "Uncategorized"}
            </Text>
            <Text variant="md" fontWeight="regular">
              {" "}
              •{" "}
            </Text>
            <RatingDisplay
              value={item.average_rating || 0}
              displayType="compact"
              size={16}
              color="primary"
            />
          </View>
          <View style={{ position: "absolute", top: 8, right: 8 }}>
            <FavoriteButton itemId={item.id} size={20} />
          </View>
        </View>
      </View>
    </Pressable>
  );
};
