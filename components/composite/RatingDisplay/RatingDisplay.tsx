import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "@/theme/hooks/useTheme";
import { Text, View } from "@/components/ui";
import { ColorKey } from "@/theme/types/keys";

type DisplayType = "full" | "compact";

interface RatingDisplayProps {
  value: number;
  displayType?: DisplayType;
  maxStars?: number;
  size?: number;
  color?: ColorKey;
}

export const RatingDisplay: React.FC<RatingDisplayProps> = ({
  value,
  displayType = "full",
  maxStars = 5,
  size = 20,
  color = "primary",
}) => {
  const { theme } = useTheme();
  const filledStars = Math.round(value);

  return (
    <View variant="row" style={{ alignItems: "center" }}>
      {displayType === "full" &&
        Array.from({ length: maxStars }, (_, index) => {
          const filled = index < filledStars;
          return (
            <MaterialIcons
              key={index}
              name={filled ? "star" : "star-border"}
              size={size}
              color={
                filled ? theme.colors[color] : theme.colors.onSurfaceVariant
              }
              style={{ marginRight: 2 }}
            />
          );
        })}

      {displayType === "compact" && (
        <MaterialIcons
          name="star"
          color={theme.colors[color]}
          size={size}
          style={{ marginRight: 4 }}
        />
      )}

      <Text variant="bodySmallMedium" color="onSurface">
        {value.toFixed(1)}
      </Text>
    </View>
  );
};
