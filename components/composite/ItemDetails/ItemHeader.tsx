import { View, Text } from "@/components/ui";
import { FavoriteButton, RatingDisplay } from "@/components/composite";
import { useTheme } from "@/hooks/useTheme";

export interface ItemHeaderProps {
  id: string;
  title: string;
  category: string;
  rating: number;
}

export const ItemHeader: React.FC<ItemHeaderProps> = ({
  id,
  title,
  category,
  rating,
}) => {
  const { theme } = useTheme();

  return (
    <View padding="lg" style={{ gap: theme.spacing.md }}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text variant="headline" numberOfLines={1} style={{ flex: 1 }}>
          {title}
        </Text>
        <FavoriteButton itemId={id} />
      </View>

      <RatingDisplay value={rating} displayType="full" size={20} />
      <Text variant="label" color="onSurfaceVariant">
        {category}
      </Text>
    </View>
  );
};
