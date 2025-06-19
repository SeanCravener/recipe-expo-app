import React from "react";
import { Pressable } from "react-native";
import { Image, Text, View, Card } from "@/components/ui";
import {
  FavoriteButton,
  RatingDisplay,
  AuthorInfo,
} from "@/components/composite";
import { ItemSummary } from "@/types/item";
import { useTheme } from "@/theme";

interface ItemCardProps {
  item: ItemSummary;
  onPress?: () => void;
}

export const ItemCard: React.FC<ItemCardProps> = ({ item, onPress }) => {
  const { theme } = useTheme();

  return (
    <View variant="padded-vertical">
      <Pressable onPress={onPress} style={{ width: "100%" }}>
        <Card
          variant="elevated"
          style={{
            overflow: "hidden",
          }}
        >
          <View variant="row">
            <Image
              source={{ uri: item.main_image }}
              variant="thumbnail"
              borderRadiusToken="md"
              style={{ width: 80, height: 80 }}
            />

            <View
              style={{
                flex: 1,
                justifyContent: "space-between",
                height: "100%",
                paddingTop: theme.spacing.sm,
                paddingLeft: theme.spacing.md,
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
              <AuthorInfo userId={item.user_id} />

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
                height: "100%",
              }}
            >
              <FavoriteButton
                variant={"primary"}
                itemId={item.id}
                size={"lg"}
              />
            </View>
          </View>
        </Card>
      </Pressable>
    </View>
  );
};
