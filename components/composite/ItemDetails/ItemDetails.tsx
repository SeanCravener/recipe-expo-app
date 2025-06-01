import { View, Text } from "@/components/ui";
import { FavoriteButton, RatingDisplay } from "@/components/composite";
import { useTheme } from "@/hooks/useTheme";

export interface ItemDetailsProps {
  id: string;
  title: string;
  category: string;
  rating: number;
  description: string;
  ingredients: string[];
}

export const ItemDetails: React.FC<ItemDetailsProps> = ({
  id,
  title,
  category,
  rating,
  description,
  ingredients,
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

      <Text variant="body">{description}</Text>
      <View style={{ marginTop: theme.spacing.sm }}>
        {ingredients.map((ingredient, index) => (
          <Text key={index} variant="body" color="onSurfaceVariant">
            - {ingredient}
          </Text>
        ))}
      </View>
    </View>
  );
};
