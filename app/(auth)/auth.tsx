import React, { useState } from "react";
import { useAuth } from "@/contexts/auth/AuthContext";
import { useTheme } from "@/theme/hooks/useTheme";
import { AuthForm } from "@/components/composite";
import { Scroll, View, ToggleText, Text, Icon } from "@/components/ui";
import type { SignInSchema, SignUpSchema } from "@/lib/schemas";

export default function AuthScreen() {
  const { signIn, signUp } = useAuth();
  const { theme } = useTheme();
  const [mode, setMode] = useState<"signIn" | "signUp">("signIn");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: SignInSchema | SignUpSchema) => {
    try {
      setIsLoading(true);
      setError(null);

      if (mode === "signIn") {
        await signIn(formData.email, formData.password);
      } else {
        await signUp(
          (formData as SignUpSchema).email,
          (formData as SignUpSchema).password,
          (formData as SignUpSchema).confirmPassword
        );
      }
    } catch (err) {
      const error = err as Error;
      setError(error?.message || "An error occurred during authentication");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: "google" | "apple" | "facebook") => {
    // Placeholder for social login implementation
    console.log(`${provider} login would be implemented here`);
    setError(`${provider} login is not implemented yet`);
  };

  return (
    <Scroll
      variant="flush"
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      contentContainerStyle={{
        paddingTop: 60, // Space for status bar and navigation
        paddingBottom: 40,
      }}
      showsVerticalScrollIndicator={false}
    >
      {/* Back Button */}
      <View
        style={{
          paddingHorizontal: 24,
          marginBottom: 32,
        }}
      >
        <Icon
          name="arrow-back"
          size="md"
          color="onBackground"
          onPress={() => console.log("Back pressed")}
          hitSlop="md"
        />
      </View>

      {/* Title */}
      <View
        style={{
          alignItems: "center",
          marginBottom: 32,
          paddingHorizontal: 24,
        }}
      >
        <Text
          variant="headerTwo"
          style={{
            marginBottom: 24,
            textAlign: "center",
          }}
        >
          {mode === "signIn" ? "Welcome Back!" : "Join Us!"}
        </Text>

        {/* Mode Toggle */}
        <View
          variant="row"
          style={{
            gap: 8,
            backgroundColor: theme.colors.surfaceVariant,
            padding: 4,
            borderRadius: theme.borderRadius.lg,
          }}
        >
          <ToggleText
            variant="pill"
            active={mode === "signIn"}
            onPress={() => {
              setMode("signIn");
              setError(null); // Clear error when switching modes
            }}
            selectionMode="single" // Use single selection styling
            disabled={isLoading}
            style={{
              paddingVertical: 12,
              paddingHorizontal: 24,
              minWidth: 100,
              borderRadius: theme.borderRadius.md,
            }}
          >
            <Text
              variant="bodyNormalMedium"
              color={mode === "signIn" ? "onPrimary" : "primary"}
            >
              Sign In
            </Text>
          </ToggleText>

          <ToggleText
            variant="pill"
            active={mode === "signUp"}
            onPress={() => {
              setMode("signUp");
              setError(null); // Clear error when switching modes
            }}
            selectionMode="single" // Use single selection styling
            disabled={isLoading}
            style={{
              paddingVertical: 12,
              paddingHorizontal: 24,
              minWidth: 100,
              borderRadius: theme.borderRadius.md,
            }}
          >
            <Text
              variant="bodyNormalMedium"
              color={mode === "signUp" ? "onPrimary" : "primary"}
            >
              Sign Up
            </Text>
          </ToggleText>
        </View>
      </View>

      {/* Auth Form */}
      <AuthForm
        mode={mode}
        onSubmit={handleSubmit}
        isLoading={isLoading}
        error={error ? ({ message: error } as Error) : null}
        onSocialLogin={handleSocialLogin}
      />
    </Scroll>
  );
}
