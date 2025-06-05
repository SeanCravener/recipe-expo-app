import "../global.css";
import { Stack } from "expo-router";
import { AuthProvider } from "@/contexts/auth/AuthContext";
import { QueryProvider } from "@/contexts/query/QueryProvider";
import { ThemeProvider } from "@/theme";
import { FavoritesProvider } from "@/contexts/FavoritesContext";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <QueryProvider>
        <AuthProvider>
          <FavoritesProvider>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen
                name="(auth)/auth"
                options={{
                  title: "Authentication",
                  presentation: "modal",
                }}
              />
              <Stack.Screen
                name="settings"
                options={{
                  title: "Settings",
                  presentation: "modal",
                }}
              />
            </Stack>
          </FavoritesProvider>
        </AuthProvider>
      </QueryProvider>
    </ThemeProvider>
  );
}
