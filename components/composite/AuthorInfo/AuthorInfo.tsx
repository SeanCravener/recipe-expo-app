import React from "react";
import { Avatar, Text, View } from "@/components/ui";
import { useGetUserProfile } from "@/hooks/useGetUserProfile";

interface AuthorInfoProps {
  userId: string;
  avatarLabel?: string;
  avatarSrc?: any; // optional local image or remote uri
  size?: "sm" | "md" | "lg";
}

export const AuthorInfo: React.FC<AuthorInfoProps> = ({
  userId,
  avatarLabel,
  avatarSrc,
  size = "sm",
}) => {
  const { data: userProfile, isLoading } = useGetUserProfile(userId);

  // Properly format the avatar source for React Native Image component
  const avatarSource = userProfile?.[0]?.avatar_url
    ? { uri: userProfile[0].avatar_url } // Remote image needs { uri: "url" }
    : avatarSrc; // Local/fallback image

  const textVariant =
    size === "sm"
      ? "bodyXSmallRegular"
      : size === "md"
      ? "bodySmallRegular"
      : "bodySmallMedium";

  return (
    <View variant="row" style={{ alignItems: "center", marginTop: 2 }}>
      <Avatar
        variant={size}
        initials={avatarLabel}
        source={avatarSource}
        style={{ marginRight: 6 }} // keeping this since you don't have marginRight token override
      />
      <Text variant={textVariant} color="onSurfaceVariant" numberOfLines={1}>
        {userProfile?.[0]?.username || "No user found"}
      </Text>
    </View>
  );
};
