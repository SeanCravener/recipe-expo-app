import React from "react";
import {
  Modal as RNModal,
  ModalProps as RNModalProps,
  Pressable,
  StyleProp,
  ViewStyle,
} from "react-native";

import { useTheme } from "@/theme/hooks/useTheme";
import { ModalVariant } from "@/theme/types/componentVariants";
import { View } from "@/components/ui";

interface ModalProps
  extends Omit<RNModalProps, "transparent" | "style" | "animationType"> {
  variant?: ModalVariant; // "default" | "fullscreen"
  visible: boolean;
  onClose?: () => void;
  contentStyle?: StyleProp<ViewStyle>;
}

export const Modal: React.FC<ModalProps> = ({
  variant = "default",
  visible,
  onClose,
  children,
  contentStyle,
  ...rest
}) => {
  const { theme } = useTheme();
  const { overlay, content } = theme.components.modal[variant];

  return (
    <RNModal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
      {...rest}
    >
      <Pressable style={overlay} onPress={onClose}>
        <View style={[content, contentStyle]}>{children}</View>
      </Pressable>
    </RNModal>
  );
};
