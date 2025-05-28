import React from "react";
import { View, ToggleText, Avatar } from "../../ui";
import { useTheme } from "../../../hooks/useTheme";

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
  const { theme } = useTheme();

  return (
    <View
      backgroundColor="surfaceContainer"
      padding="xl"
      style={{ alignItems: "center" }}
    >
      <View
        style={{
          marginBottom: theme.spacing.lg,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Avatar
          source={
            avatarUri
              ? { uri: avatarUri }
              : require("../../../assets/default-avatar.png")
          }
          label="U"
          size="xl"
          backgroundColor="primary"
          textColor="onPrimary"
        />
      </View>

      <ToggleText
        options={["created", "favorited"]}
        selected={activeTab}
        onChange={(val) => onTabChange(val as "created" | "favorited")}
      />
    </View>
  );
};
