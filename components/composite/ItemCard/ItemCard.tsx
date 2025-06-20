//
//  TODO:
//    1. Test num of characters/number of words/total length of title
//          to see if it messes with the other components in the card,
//          also see how it affects the height, overflow, favorite
//          button etc.
//    2. Get avatar in AuthorInfo component working properly.
//    3. Finish styling.

import React from "react";
import { Pressable } from "react-native";
import { Image, Text, View, Card } from "@/components/ui";
import {
  FavoriteButton,
  RatingDisplay,
  AuthorInfo,
} from "@/components/composite";
import { ItemSummary } from "@/types/item";

interface ItemCardProps {
  item: ItemSummary;
  onPress?: () => void;
}

export const ItemCard: React.FC<ItemCardProps> = ({ item, onPress }) => {
  return (
    <View style={{ marginVertical: 8 }}>
      <Pressable onPress={onPress} style={{ width: "100%" }}>
        <Card
          variant="elevated"
          style={{
            overflow: "hidden",
            minHeight: 120,
            marginHorizontal: 12,
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 10,
          }}
        >
          <View
            variant="row"
            style={{
              position: "relative",
              width: "100%",
              padding: 0, // Center content vertically
            }}
          >
            <Image
              source={{ uri: item.main_image }}
              variant="thumbnail"
              borderRadiusToken="md"
              style={{ width: 100, height: 100, marginRight: 8, flexShrink: 0 }}
            />

            <View
              style={{
                flex: 1,
                paddingVertical: 6,
                paddingRight: 44,
                paddingLeft: 0,
                height: 112,
                justifyContent: "space-between",
              }}
            >
              <View style={{ flex: 1, justifyContent: "flex-start" }}>
                <Text
                  variant="bodyNormalBold"
                  numberOfLines={2}
                  style={{
                    marginBottom: 4,
                    marginRight: 4,
                    lineHeight: 18,
                  }}
                >
                  {item.title}
                </Text>
                <AuthorInfo userId={item.user_id} />
              </View>

              <View style={{ marginTop: 8 }}>
                <View variant="row" style={{ alignItems: "center", gap: 8 }}>
                  <Text
                    variant="bodySmallRegular"
                    numberOfLines={1}
                    color="onSurfaceVariant"
                  >
                    {item.category || "Uncategorized"}
                  </Text>

                  <Text variant="bodySmallRegular" color="onSurfaceVariant">
                    •
                  </Text>

                  <RatingDisplay
                    value={item.average_rating || 0}
                    displayType="compact"
                    size={14}
                    color="primary"
                  />
                </View>
              </View>
            </View>

            {/* Favorite Button - Positioned absolutely */}
            <View
              style={{
                position: "absolute",
                top: 6,
                right: 0,
              }}
            >
              <FavoriteButton
                variant={"primary"}
                itemId={item.id}
                size={"md"}
              />
            </View>
          </View>
        </Card>
      </Pressable>
    </View>
  );
};
