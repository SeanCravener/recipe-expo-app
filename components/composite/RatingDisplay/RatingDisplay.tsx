import React from "react";
import { useTheme } from "@/hooks/useTheme";
import { Icon, Text, View } from "@/components/ui";

type DisplayType = "full" | "compact";
type ColorKey = keyof ReturnType<typeof useTheme>["theme"]["colors"];

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
  const filledStars = Math.round(value); // ✅ Fill based on whole number

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      {displayType === "full" &&
        Array.from({ length: maxStars }, (_, index) => {
          const filled = index < filledStars;
          return (
            <Icon
              key={index}
              name="star"
              size={size}
              color={filled ? color : "onSurfaceVariant"}
              style={{ marginRight: 2 }}
            />
          );
        })}
      {displayType === "compact" && (
        <Icon
          name="star"
          color={color}
          size={size}
          style={{ marginRight: 4 }}
        />
      )}
      <Text variant="label" color="onSurface">
        {value.toFixed(1)}
      </Text>
    </View>
  );
};
