import React from "react";
import {
  Pressable,
  Modal as RNModal,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { View } from "@/components/ui";

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  backdropColor?: keyof ReturnType<typeof useTheme>["theme"]["colors"];
  contentBackground?: keyof ReturnType<typeof useTheme>["theme"]["colors"];
}

export const Modal: React.FC<ModalProps> = ({
  visible,
  onClose,
  children,
  style,
  backdropColor = "scrim",
  contentBackground = "surfaceContainer",
}) => {
  const { theme } = useTheme();

  return (
    <RNModal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable
        style={[
          styles.backdrop,
          { backgroundColor: theme.colors[backdropColor] + "88" }, // Fix type error for backdrop color with transparency
        ]}
        onPress={onClose}
      >
        <View
          backgroundColor={contentBackground}
          padding="lg"
          borderRadius="xl"
          style={[styles.modalContent, style]}
        >
          {children}
        </View>
      </Pressable>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    minWidth: "80%",
    maxWidth: "90%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
});
