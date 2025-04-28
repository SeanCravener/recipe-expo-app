import { View, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import ProfileHeader from "../../components/ProfileHeader"; // Adjust path as needed
import ItemList from "../../components/ItemList"; // Adjust path as needed
import { useItems } from "../../hooks/useItems";
import { supabase } from "../../lib/supabase";
import { ProtectedRoute } from "../../components/protected/ProtectedRoute";
import { Permission } from "../../lib/permissions"; // Adjust path as needed

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
    <View style={styles.container}>
      <ProfileHeader
        avatarUri={avatarUrl} // Use fetched avatar URL
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />
      <ItemList
        data={currentData}
        isLoading={isLoading}
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
        emptyText={
          activeTab === "created"
            ? "You haven’t created any items yet"
            : "You haven’t favorited any items yet"
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
});
