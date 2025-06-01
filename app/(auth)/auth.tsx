import React, { useState } from "react";
import { View } from "react-native";
import { useAuth } from "@/contexts/auth/AuthContext";
import { AuthForm } from "@/components/composite";
import { Scroll, Text, ToggleText } from "@/components/ui";
import type { SignInSchema, SignUpSchema } from "@/lib/schemas";

export default function AuthScreen() {
  const { signIn, signUp } = useAuth();
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
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred during authentication"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Scroll padding="lg">
      <View style={{ alignItems: "center", marginBottom: 16 }}>
        <ToggleText
          options={["Sign In", "Sign Up"]}
          selected={mode === "signIn" ? "Sign In" : "Sign Up"}
          onChange={(value) =>
            setMode(value === "Sign In" ? "signIn" : "signUp")
          }
        />
      </View>

      {error && (
        <Text color="error" align="center" style={{ marginBottom: 12 }}>
          {error}
        </Text>
      )}

      <AuthForm mode={mode} onSubmit={handleSubmit} isLoading={isLoading} />
    </Scroll>
  );
}
