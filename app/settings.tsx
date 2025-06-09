import React, { useState } from "react";
import { router } from "expo-router";
import { useAuth } from "@/contexts/auth/AuthContext";
import { useTheme } from "@/theme/hooks/useTheme";
import { View, Text, Button, ToggleText, Error } from "@/components/ui";

export default function SettingsScreen() {
  const { session, signOut } = useAuth();
  const { mode, setMode } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignOut = async () => {
    try {
      setIsLoading(true);
      setError(null);
      await signOut();
      router.replace("/");
    } catch (err) {
      const error = err as Error;
      setError(error?.message || "An error occurred during sign out");
    } finally {
      setIsLoading(false);
    }
  };

  const handleModeChange = (value: string) => {
    setMode(value === "Dark" ? "dark" : "light");
  };

  return (
    <View variant="centered" padding="lg" style={{ flex: 1, gap: 24 }}>
      {error && <Error variant="box" message={error} />}

      <Text variant="headerTwo" style={{ textAlign: "center" }}>
        Welcome, {session ? session.user.id : "Guest"}
      </Text>

      {/* Theme Toggle */}
      <View style={{ alignItems: "center", gap: 8 }}>
        <Text variant="bodyNormalBold" style={{ textAlign: "center" }}>
          Theme
        </Text>
        <View variant="row" style={{ gap: 8 }}>
          <ToggleText
            variant="pill"
            active={mode === "light"}
            onPress={() => setMode("light")}
          >
            Light
          </ToggleText>

          <ToggleText
            variant="pill"
            active={mode === "dark"}
            onPress={() => setMode("dark")}
          >
            Dark
          </ToggleText>
        </View>
      </View>

      {/* Authentication Button */}
      {session ? (
        <Button
          variant="danger"
          size="lg"
          onPress={handleSignOut}
          disabled={isLoading}
          loading={isLoading}
          fullWidth
        >
          {isLoading ? "Logging out..." : "Log Out"}
        </Button>
      ) : (
        <Button
          variant="primary"
          size="lg"
          onPress={() => router.push("/(auth)/auth")}
          fullWidth
        >
          Sign In
        </Button>
      )}
    </View>
  );
}
