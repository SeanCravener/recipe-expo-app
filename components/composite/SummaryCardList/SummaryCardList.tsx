// components/composites/SummaryCardList.tsx
import React from "react";
import { ActivityIndicator, FlatList, ListRenderItem } from "react-native";
import { useTheme } from "../../../hooks/useTheme";
import { Text, View } from "../../ui";
import { SummaryCardRectangle, SummaryCardSquare } from "../index";

interface ArticleItem {
  id: string;
  title: string;
  rating: number;
  tags: string[];
  image: any;
  author: {
    name: string;
    avatarLabel?: string;
    avatarSrc?: any;
  };
  isFavorite?: boolean;
}

interface SummaryCardListProps {
  data: ArticleItem[];
  layout?: "square" | "rectangle";
  horizontal?: boolean;
  limit?: number;
  loadingMore?: boolean;
  onPressCard?: (item: ArticleItem) => void;
  onToggleFavorite?: (item: ArticleItem, value: boolean) => void;
  onEndReached?: () => void;
  ListHeaderComponent?: React.ReactElement | null;
  ListEmptyComponent?: React.ReactElement | null;
  ListFooterComponent?: React.ReactElement | null;
}

export const SummaryCardList: React.FC<SummaryCardListProps> = ({
  data,
  layout = "rectangle",
  horizontal = false,
  limit,
  loadingMore = false,
  onPressCard,
  onToggleFavorite,
  onEndReached,
  ListHeaderComponent,
  ListEmptyComponent,
  ListFooterComponent,
}) => {
  const { theme } = useTheme();
  const visibleData = limit ? data.slice(0, limit) : data;

  const renderItem: ListRenderItem<ArticleItem> = ({ item }) => {
    const commonProps = {
      title: item.title,
      rating: item.rating,
      tags: item.tags,
      image: item.image,
      author: item.author,
      isFavorite: item.isFavorite,
      onToggleFavorite: (val: boolean) => onToggleFavorite?.(item, val),
      onPress: () => onPressCard?.(item),
    };

    return layout === "square" ? (
      <SummaryCardSquare {...commonProps} />
    ) : (
      <SummaryCardRectangle {...commonProps} />
    );
  };

  const snapToInterval = layout === "square" && horizontal ? 192 : undefined; // 180 width + 12 gap
  const showsSnap = snapToInterval !== undefined;

  return (
    <FlatList
      data={visibleData}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      horizontal={horizontal}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingVertical: 8,
        gap: 12,
        paddingHorizontal: horizontal ? 12 : 0,
      }}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.6}
      snapToInterval={snapToInterval}
      snapToAlignment={showsSnap ? "start" : undefined}
      decelerationRate={showsSnap ? "fast" : undefined}
      ListHeaderComponent={ListHeaderComponent ?? null}
      ListEmptyComponent={
        ListEmptyComponent ?? (
          <View style={{ padding: 16 }}>
            <Text variant="label" color="onSurfaceVariant">
              No items found.
            </Text>
          </View>
        )
      }
      ListFooterComponent={
        loadingMore ? (
          <View style={{ padding: 16 }}>
            <ActivityIndicator color={theme.colors.primary} />
          </View>
        ) : (
          ListFooterComponent ?? null
        )
      }
    />
  );
};
