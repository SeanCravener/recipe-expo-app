// components/composites/TagRow.tsx
import React from "react";
import { useTheme } from "../../../hooks/useTheme";
import { Text, View } from "../../ui";

interface TagRowProps {
  tags: string[];
}

export const TagRow: React.FC<TagRowProps> = ({ tags }) => {
  const { theme } = useTheme();

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      {tags.map((tag, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <View
              style={{
                width: 4,
                height: 4,
                borderRadius: 2,
                backgroundColor: theme.colors.onSurfaceVariant,
                marginHorizontal: 6,
              }}
            />
          )}
          <Text variant="label" color="onSurfaceVariant">
            {tag}
          </Text>
        </React.Fragment>
      ))}
    </View>
  );
};
