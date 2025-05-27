// components/composites/SummaryCardSquare.tsx
import React from "react";
import { Pressable } from "react-native";
import { Image, Text, View } from "../../ui";
import { AuthorInfo, FavoriteButton, RatingDisplay, TagRow } from "../index";

import { useTheme } from "../../../hooks/useTheme";

interface SummaryCardSquareProps {
  title: string;
  rating: number;
  tags: string[];
  author: {
    name: string;
    avatarLabel?: string;
    avatarSrc?: any;
  };
  image: any; // local or remote image
  isFavorite?: boolean;
  onToggleFavorite?: (val: boolean) => void;
  onPress?: () => void;
}

export const SummaryCardSquare: React.FC<SummaryCardSquareProps> = ({
  title,
  rating,
  tags,
  author,
  image,
  isFavorite,
  onToggleFavorite,
  onPress,
}) => {
  const { theme } = useTheme();

  return (
    <Pressable onPress={onPress}>
      <View
        backgroundColor="surface"
        borderRadius="lg"
        style={{ width: 180, overflow: "hidden" }}
      >
        <View style={{ position: "relative" }}>
          <Image
            source={image}
            style={{ width: "100%", height: 120 }}
            radius="lg"
          />
          <View style={{ position: "absolute", top: 8, right: 8 }}>
            <FavoriteButton
              isFavorite={isFavorite}
              onToggle={onToggleFavorite}
              size={20}
            />
          </View>
        </View>

        <View padding="md">
          <Text variant="body" fontWeight="medium" style={{ marginBottom: 4 }}>
            {title}
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 6,
            }}
          >
            <RatingDisplay value={rating} displayType="compact" />
            {tags.length > 0 && (
              <View style={{ marginLeft: 8 }}>
                <TagRow tags={tags.slice(0, 2)} />
              </View>
            )}
          </View>

          <AuthorInfo
            username={author.name}
            avatarLabel={author.avatarLabel}
            avatarSrc={author.avatarSrc}
          />
        </View>
      </View>
    </Pressable>
  );
};
