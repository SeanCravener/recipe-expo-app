import React from "react";
import { Pressable } from "react-native";
import { Image, Text, View, Card } from "@/components/ui";
import { FavoriteButton, RatingDisplay } from "@/components/composite";
import { ItemSummary } from "@/types/item";

interface ItemCardProps {
  item: ItemSummary;
  onPress?: () => void;
}

export const ItemCard: React.FC<ItemCardProps> = ({ item, onPress }) => {
  return (
    <Pressable onPress={onPress} style={{ width: "100%" }}>
      <Card
        variant="elevated"
        style={{
          margin: 8,
          overflow: "hidden",
        }}
      >
        <View variant="row" style={{ position: "relative" }}>
          <Image
            source={{ uri: item.main_image }}
            variant="thumbnail"
            borderRadiusToken="md"
            style={{ width: 80, height: 80 }}
          />

          <View
            padding="md"
            style={{
              flex: 1,
              justifyContent: "space-between",
              minHeight: 80,
            }}
          >
            <View>
              <Text
                variant="bodyNormalBold"
                style={{
                  marginBottom: 4,
                  marginRight: 32, // space for favorite button
                }}
              >
                {item.title}
              </Text>
            </View>

            <View variant="row" style={{ alignItems: "center", gap: 8 }}>
              <Text variant="bodySmallRegular" color="onSurfaceVariant">
                {item.category || "Uncategorized"}
              </Text>

              <Text variant="bodySmallRegular" color="onSurfaceVariant">
                •
              </Text>

              <RatingDisplay
                value={item.average_rating || 0}
                displayType="compact"
                size={16}
                color="primary"
              />
            </View>
          </View>

          {/* Favorite Button - Positioned absolutely */}
          <View
            style={{
              position: "absolute",
              top: 8,
              right: 8,
            }}
          >
            <FavoriteButton itemId={item.id} size={20} />
          </View>
        </View>
      </Card>
    </Pressable>
  );
};
