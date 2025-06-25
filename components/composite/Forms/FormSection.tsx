import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import { Card, View, Text, Icon } from "@/components/ui";

interface FormSectionProps {
  /** Section title */
  title?: string;
  /** Optional subtitle or description */
  subtitle?: string;
  /** Show edit button in header */
  showEditButton?: boolean;
  /** Edit button handler */
  onEdit?: () => void;
  /** Custom card variant */
  variant?: "form" | "filled" | "outlined" | "elevated";
  /** Custom styles */
  style?: StyleProp<ViewStyle>;
  /** Section content */
  children: React.ReactNode;
}

export const FormSection: React.FC<FormSectionProps> = ({
  title,
  subtitle,
  showEditButton = false,
  onEdit,
  variant = "form",
  style,
  children,
}) => {
  return (
    <Card variant={variant} style={style}>
      {/* Header */}
      {(title || showEditButton) && (
        <View
          variant="row"
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: title ? 12 : 0,
          }}
        >
          <View>
            {title && (
              <Text variant="bodyNormalBold" style={{ marginBottom: 2 }}>
                {title}
              </Text>
            )}
            {subtitle && (
              <Text variant="bodySmallRegular" color="onSurfaceVariant">
                {subtitle}
              </Text>
            )}
          </View>

          {showEditButton && onEdit && (
            <Icon
              name="edit-one"
              variant="unfilled"
              size="md"
              color="onSurfaceVariant"
              onPress={onEdit}
              hitSlop="md"
            />
          )}
        </View>
      )}

      {/* Content */}
      {children}
    </Card>
  );
};
