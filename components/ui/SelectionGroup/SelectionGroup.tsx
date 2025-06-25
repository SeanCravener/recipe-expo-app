import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import { useTheme } from "@/theme/hooks/useTheme";
import { View, Text, Error, ToggleText } from "@/components/ui";
import { ToggleTextVariant } from "@/theme/types/componentVariants";

interface SelectionOption {
  id: string | number;
  label: string;
  disabled?: boolean;
}

interface SelectionGroupProps {
  options: SelectionOption[];
  value?: string | number | (string | number)[];
  onChange: (value: string | number | (string | number)[]) => void;
  // Selection behavior
  mode?: "single" | "multiple" | "limited";
  maxSelections?: number; // Only used when mode is "limited"
  // Styling
  variant?: ToggleTextVariant;
  label?: string;
  helpText?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  style?: StyleProp<ViewStyle>;
  // Layout
  direction?: "row" | "column";
  gap?: number;
}

export const SelectionGroup: React.FC<SelectionGroupProps> = ({
  options,
  value,
  onChange,
  mode = "single",
  maxSelections = 1,
  variant = "pill",
  label,
  helpText,
  required = false,
  disabled = false,
  error,
  style,
  direction = "row",
  gap,
}) => {
  const { theme } = useTheme();

  // Normalize value to array for easier handling
  const selectedValues = React.useMemo(() => {
    if (Array.isArray(value)) return value;
    return value !== undefined ? [value] : [];
  }, [value]);

  // Handle option selection
  const handleSelection = React.useCallback(
    (optionId: string | number) => {
      if (disabled) return;

      if (mode === "single") {
        // Single selection: replace current value
        onChange(optionId);
      } else {
        // Multiple or limited selection
        const newSelection = selectedValues.includes(optionId)
          ? selectedValues.filter((id) => id !== optionId) // Remove if already selected
          : [...selectedValues, optionId]; // Add if not selected

        // Check limits for limited mode
        if (mode === "limited" && newSelection.length > maxSelections) {
          // Replace oldest selection with new one
          newSelection.shift();
        }

        onChange(newSelection);
      }
    },
    [disabled, mode, selectedValues, onChange, maxSelections]
  );

  // Calculate selection count for display
  const selectionCount = selectedValues.length;
  const maxCount = mode === "limited" ? maxSelections : options.length;

  return (
    <View style={[{ marginBottom: theme.spacing.lg }, style]}>
      {/* Label and count */}
      {(label || mode !== "single") && (
        <View style={{ marginBottom: theme.spacing.sm }}>
          <View variant="row" style={{ alignItems: "center", marginBottom: 4 }}>
            {label && (
              <Text variant="bodyNormalBold">
                {label}
                {required && (
                  <Text variant="bodyNormalBold" color="error">
                    {" "}
                    *
                  </Text>
                )}
              </Text>
            )}

            {mode !== "single" && (
              <Text
                variant="bodySmallRegular"
                color="onSurfaceVariant"
                style={{ marginLeft: theme.spacing.xs }}
              >
                ({selectionCount}/{maxCount})
              </Text>
            )}
          </View>

          {helpText && (
            <Text
              variant="bodySmallRegular"
              color="onSurfaceVariant"
              style={{ marginTop: 2 }}
            >
              {helpText}
            </Text>
          )}
        </View>
      )}

      {/* Options */}
      <View
        style={{
          flexDirection: direction,
          flexWrap: direction === "row" ? "wrap" : "nowrap",
          gap: gap ?? theme.spacing.sm,
          opacity: disabled ? 0.6 : 1,
        }}
      >
        {options.map((option) => {
          const isSelected = selectedValues.includes(option.id);
          const isOptionDisabled = disabled || option.disabled;

          return (
            <ToggleText
              key={option.id}
              variant={variant}
              active={isSelected}
              disabled={isOptionDisabled}
              onPress={() => handleSelection(option.id)}
              selectionMode={mode === "single" ? "single" : "multiple"}
              style={{
                borderColor: error ? theme.colors.error : undefined,
              }}
            >
              {option.label}
            </ToggleText>
          );
        })}
      </View>

      {/* Error message */}
      {error && (
        <View style={{ marginTop: theme.spacing.sm }}>
          <Error variant="text" message={error} />
        </View>
      )}

      {/* Selection limit warning for limited mode */}
      {mode === "limited" && selectionCount >= maxSelections && (
        <View style={{ marginTop: theme.spacing.sm }}>
          <Text
            variant="bodyXSmallRegular"
            color="onSurfaceVariant"
            style={{ fontStyle: "italic" }}
          >
            Maximum {maxSelections} selection{maxSelections !== 1 ? "s" : ""}{" "}
            reached
          </Text>
        </View>
      )}
    </View>
  );
};
