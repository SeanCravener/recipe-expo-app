import React, { useState, useEffect } from "react";
import { Stack } from "expo-router";
import { View, Text } from "@/components/ui";
import {
  ItemList,
  ProfileHeader,
  SettingsButton,
} from "@/components/composite";
import { useItems } from "@/hooks/useItems";
import { supabase } from "@/lib/supabase";
import { ProtectedRoute } from "@/components/protected/ProtectedRoute";
import { Permission } from "@/lib/permissions";
import { useTheme } from "@/theme/hooks/useTheme";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Profile() {
  // Wrap the entire component content in ProtectedRoute
  return (
    <ProtectedRoute permission={Permission.VIEW_PROFILE}>
      <ProfileContent />
    </ProtectedRoute>
  );
}

// Separate the content into its own component
function ProfileContent() {
  const [activeTab, setActiveTab] = useState<"created" | "favorited">(
    "created"
  );
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(undefined);
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();

  // Fetch user-created items
  const {
    data: createdItems,
    isLoading: isLoadingCreated,
    fetchNextPage: fetchNextCreated,
    hasNextPage: hasNextCreated,
    isFetchingNextPage: isFetchingNextCreated,
  } = useItems("created");

  // Fetch user-favorited items
  const {
    data: favoritedItems,
    isLoading: isLoadingFavorited,
    fetchNextPage: fetchNextFavorited,
    hasNextPage: hasNextFavorited,
    isFetchingNextPage: isFetchingNextFavorited,
  } = useItems("favorited");

  // Fetch user's avatar URL from profiles table
  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        const { data: sessionData } = await supabase.auth.getSession();
        const userId = sessionData?.session?.user?.id;
        if (userId) {
          const { data, error } = await supabase
            .from("profiles")
            .select("avatar_url")
            .eq("id", userId)
            .single();
          if (error) throw error;
          setAvatarUrl(data?.avatar_url);
        }
      } catch (error) {
        console.error("Error fetching avatar:", error);
        setAvatarUrl(undefined);
      }
    };
    fetchAvatar();
  }, []);

  const handleTabChange = (tab: "created" | "favorited") => {
    setActiveTab(tab);
  };

  // Dynamically select data and state based on active tab
  const currentData = activeTab === "created" ? createdItems : favoritedItems;
  const isLoading =
    activeTab === "created" ? isLoadingCreated : isLoadingFavorited;
  const isFetchingNextPage =
    activeTab === "created" ? isFetchingNextCreated : isFetchingNextFavorited;
  const hasNextPage =
    activeTab === "created" ? hasNextCreated : hasNextFavorited;
  const fetchNextPage =
    activeTab === "created" ? fetchNextCreated : fetchNextFavorited;

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Profile",
          header: ({ options }) => (
            <View
              backgroundColor="surface"
              style={{
                paddingTop: insets.top, // Dynamic padding based on device
                boxShadow: "0px 0px 8px 1px #A1D9DD",
                borderBottomColor: theme.colors.primaryContainer,
                borderBottomWidth: 1,
              }}
            >
              {/* Title Row */}
              <View
                variant="row"
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 10,
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ width: 40 }} />
                <Text variant="bodyXLargeBold">{options.title}</Text>
                <SettingsButton size="lg" />
              </View>
              <View style={{ marginBottom: 12 }}>
                <ProfileHeader
                  avatarUri={avatarUrl}
                  activeTab={activeTab}
                  onTabChange={handleTabChange}
                />
              </View>
            </View>
          ),
        }}
      />
      <ItemList
        data={currentData}
        isLoading={isLoading}
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
        emptyText={
          activeTab === "created"
            ? "You haven't created any items yet"
            : "You haven't favorited any items yet"
        }
      />
    </>
  );
}
