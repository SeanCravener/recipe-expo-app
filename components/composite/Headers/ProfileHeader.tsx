import React from "react";
import { View, ToggleText, Avatar } from "@/components/ui";

interface ProfileHeaderProps {
  avatarUri?: string;
  activeTab: "created" | "favorited";
  onTabChange: (tab: "created" | "favorited") => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  avatarUri,
  activeTab,
  onTabChange,
}) => {
  return (
    <View
      style={{ justifyContent: "center", alignItems: "center" }}
      backgroundColor="surface"
      padding="sm"
    >
      <View style={{ marginBottom: 16 }}>
        <Avatar
          variant="lg"
          source={
            avatarUri
              ? { uri: avatarUri }
              : require("../../../assets/default-avatar.png")
          }
          initials="U"
        />
      </View>

      <View variant="row" style={{ gap: 8 }}>
        <ToggleText
          variant="pill"
          active={activeTab === "created"}
          onPress={() => onTabChange("created")}
        >
          Created
        </ToggleText>

        <ToggleText
          variant="pill"
          active={activeTab === "favorited"}
          onPress={() => onTabChange("favorited")}
        >
          Favorited
        </ToggleText>
      </View>
    </View>
  );
};
