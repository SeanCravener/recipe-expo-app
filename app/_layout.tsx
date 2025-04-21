import { Stack } from "expo-router";
import { AuthProvider } from "../contexts/auth/AuthContext";
import { QueryProvider } from "../contexts/query/QueryProvider";

export default function RootLayout() {
  return (
    <QueryProvider>
      <AuthProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="(auth)/sign-in"
            options={{
              title: "Sign In",
              presentation: "modal",
            }}
          />
          <Stack.Screen
            name="(auth)/sign-up"
            options={{
              title: "Sign Up",
              presentation: "modal",
            }}
          />
        </Stack>
      </AuthProvider>
    </QueryProvider>
  );
}
