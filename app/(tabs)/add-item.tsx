// Fix problem of the user being sent to the item detail page without a back button after adding a new item successfully.
import React from "react";
import { useRouter } from "expo-router";
import { useAuth } from "@/contexts/auth/AuthContext";
import { View, Text } from "@/components/ui";
import { AddItemForm } from "@/components/composite";

export default function AddItemScreen() {
  const { session } = useAuth();
  const router = useRouter();

  if (!session?.user?.id) {
    return (
      <View variant="centered" padding="lg" style={{ flex: 1 }}>
        <Text
          variant="bodyLargeRegular"
          color="error"
          style={{ textAlign: "center" }}
        >
          You must be signed in to add a recipe.
        </Text>
      </View>
    );
  }

  const handleSuccess = (item: { id: string }) => {
    router.replace(`/items/${item.id}`);
  };

  return <AddItemForm userId={session.user.id} onSuccess={handleSuccess} />;
}
