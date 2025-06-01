import React from "react";
import { Avatar, Text, View } from "@/components/ui";

interface AuthorInfoProps {
  username: string;
  avatarLabel?: string;
  avatarSrc?: any; // optional local image or remote uri
}

export const AuthorInfo: React.FC<AuthorInfoProps> = ({
  username,
  avatarLabel,
  avatarSrc,
}) => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Avatar
        label={avatarLabel}
        source={avatarSrc}
        size={"md"}
        style={{ marginRight: 8 }}
      />
      <Text variant="label" color="onSurfaceVariant">
        {username}
      </Text>
    </View>
  );
};
