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
    <View variant="row" margin="md">
      <Avatar
        variant="md"
        initials={avatarLabel}
        source={avatarSrc}
        style={{ marginRight: 8 }} // keeping this since you don't have marginRight token override
      />
      <Text variant="bodyNormalMedium" color="onSurfaceVariant">
        {username}
      </Text>
    </View>
  );
};
