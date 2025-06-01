import React, { useState } from "react";
import { router } from "expo-router";
import { useAuth } from "@/contexts/auth/AuthContext";
import { useThemeContext } from "@/contexts/ThemeContext";
import { View, Text, Button, ToggleText } from "@/components/ui";

export default function SettingsScreen() {
  const { session, signOut } = useAuth();
  const { mode, setMode } = useThemeContext();
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

  const handleModeChange = (value: string) => {
    setMode(value === "Dark" ? "dark" : "light");
  };

  return (
    <View padding="lg" style={{ justifyContent: "center", gap: 24, flex: 1 }}>
      {error && (
        <Text color="error" align="center">
          {error}
        </Text>
      )}

      <Text variant="title" align="center">
        Welcome, {session ? session.user.id : "Guest"}
      </Text>

      <ToggleText
        options={["Light", "Dark"]}
        selected={mode === "dark" ? "Dark" : "Light"}
        onChange={handleModeChange}
      />

      {session ? (
        <Button
          title={isLoading ? "Logging out..." : "Log Out"}
          onPress={handleSignOut}
          color="secondary"
          disabled={isLoading}
        />
      ) : (
        <Button
          title="Sign In"
          onPress={() => router.push("/(auth)/auth")}
          color="primary"
        />
      )}
    </View>
  );
}
