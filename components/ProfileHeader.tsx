import React from "react";
import { View, Image, Pressable, Text, StyleSheet } from "react-native";

interface ProfileHeaderProps {
  avatarUri?: string; // URI for the user's avatar image
  activeTab: "created" | "favorited"; // Current active tab
  onTabChange: (tab: "created" | "favorited") => void; // Callback to handle tab change
}

const ProfileHeader = ({
  avatarUri,
  activeTab,
  onTabChange,
}: ProfileHeaderProps) => {
  return (
    <View style={styles.container}>
      {/* Avatar */}
      <View style={styles.avatarContainer}>
        <Image
          source={
            avatarUri
              ? { uri: avatarUri }
              : require("../assets/default-avatar.png") // Fallback to a default avatar if none provided
          }
          style={styles.avatar}
          resizeMode="cover"
        />
      </View>

      {/* Toggle Button */}
      <View style={styles.toggleContainer}>
        <Pressable
          style={[
            styles.toggleButton,
            activeTab === "created" && styles.activeToggleButton,
          ]}
          onPress={() => onTabChange("created")}
        >
          <Text
            style={[
              styles.toggleText,
              activeTab === "created" && styles.activeToggleText,
            ]}
          >
            Created
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.toggleButton,
            activeTab === "favorited" && styles.activeToggleButton,
          ]}
          onPress={() => onTabChange("favorited")}
        >
          <Text
            style={[
              styles.toggleText,
              activeTab === "favorited" && styles.activeToggleText,
            ]}
          >
            Favorited
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    alignItems: "center",
    backgroundColor: "#f5f5f5", // Light background for the header
  },
  avatarContainer: {
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50, // Fully rounded for circular avatar
    borderWidth: 2,
    borderColor: "#fff", // White border for a clean look
    backgroundColor: "#ccc", // Fallback background if image fails to load
  },
  toggleContainer: {
    flexDirection: "row",
    backgroundColor: "#e0e0e0",
    borderRadius: 25, // Rounded corners for the toggle background
    overflow: "hidden",
    width: 200, // Fixed width for the toggle
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  activeToggleButton: {
    backgroundColor: "#007AFF", // Active tab color (iOS blue)
  },
  toggleText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#555",
  },
  activeToggleText: {
    color: "#fff", // White text for active tab
    fontWeight: "600",
  },
});

export default ProfileHeader;
