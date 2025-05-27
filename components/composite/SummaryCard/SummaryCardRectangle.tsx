// components/composites/SummaryCardRectangle.tsx
import React from "react";
import { Pressable } from "react-native";
import { useTheme } from "../../../hooks/useTheme";
import { Image, Text, View } from "../../ui";
import { AuthorInfo, FavoriteButton, TagRow } from "../index";

interface SummaryCardRectangleProps {
  title: string;
  rating: number;
  tags: string[];
  author: {
    name: string;
    avatarLabel?: string;
    avatarSrc?: any;
  };
  image: any;
  isFavorite?: boolean;
  onToggleFavorite?: (val: boolean) => void;
  onPress?: () => void;
}

export const SummaryCardRectangle: React.FC<SummaryCardRectangleProps> = ({
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
    <Pressable onPress={onPress} style={{ width: "100%" }}>
      <View
        backgroundColor="surface"
        borderRadius="lg"
        style={{ flexDirection: "row", overflow: "hidden", width: "100%" }}
      >
        <Image source={image} style={{ width: 100, height: 100 }} />

        <View padding="md" style={{ flex: 1, justifyContent: "space-between" }}>
          <View>
            <Text
              variant="body"
              fontWeight="medium"
              style={{ marginBottom: 4 }}
            >
              {title}
            </Text>
            <TagRow tags={tags.slice(0, 2)} />
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: theme.spacing.sm,
            }}
          >
            <AuthorInfo
              username={author.name}
              avatarLabel={author.avatarLabel}
              avatarSrc={author.avatarSrc}
            />

            <View
              onStartShouldSetResponderCapture={() => true}
              style={{ marginLeft: theme.spacing.sm }}
            >
              <FavoriteButton
                isFavorite={isFavorite}
                onToggle={onToggleFavorite}
                size={20}
              />
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
};
