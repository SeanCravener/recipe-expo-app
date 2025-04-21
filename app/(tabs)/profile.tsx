import { View, Text, Pressable, StyleSheet } from "react-native";
import { useAuth } from "../../contexts/auth/AuthContext";
import { useState } from "react";
import { router } from "expo-router";
import { ProtectedRoute } from "../../components/protected/ProtectedRoute";
import { Permission } from "../../lib/permissions";

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
  const { session, signOut } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignOut = async () => {
    try {
      setIsLoading(true);
      setError(null);
      await signOut();
      router.replace("/");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An error occurred during sign out"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {error && <Text style={styles.errorText}>{error}</Text>}
      <Text style={styles.text}>Welcome, {session?.user.id}</Text>
      <Pressable
        style={[styles.button, isLoading && styles.buttonDisabled]}
        onPress={handleSignOut}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>
          {isLoading ? "Logging out..." : "Log Out"}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    padding: 20,
  },
  text: {
    fontSize: 24,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#FF3B30",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    width: "100%",
    maxWidth: 200,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
});
