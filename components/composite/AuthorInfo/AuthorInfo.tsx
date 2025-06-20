import React from "react";
import { Avatar, Text, View } from "@/components/ui";
import { useGetUserProfile } from "@/hooks/useGetUserProfile";

interface AuthorInfoProps {
  userId: string;
  avatarLabel?: string;
  avatarSrc?: any; // optional local image or remote uri
}

export const AuthorInfo: React.FC<AuthorInfoProps> = ({
  userId,
  avatarLabel,
  avatarSrc,
}) => {
  const { data: userProfile, isLoading } = useGetUserProfile(userId);

  return (
    <View variant="row" style={{ alignItems: "center", marginTop: 2 }}>
      <Avatar
        variant="sm"
        initials={avatarLabel}
        source={avatarSrc}
        style={{ marginRight: 6 }} // keeping this since you don't have marginRight token override
      />
      <Text
        variant="bodyXSmallRegular"
        color="onSurfaceVariant"
        numberOfLines={1}
      >
        {userProfile?.[0]?.username || "No user found"}
      </Text>
    </View>
  );
};
