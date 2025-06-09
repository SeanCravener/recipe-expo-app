import React, { useState } from "react";
import { useAuth } from "@/contexts/auth/AuthContext";
import { AuthForm } from "@/components/composite";
import { Scroll, View, ToggleText } from "@/components/ui";
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
      const error = err as Error;
      setError(error?.message || "An error occurred during authentication");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Scroll variant="padded">
      <View style={{ alignItems: "center", marginBottom: 24 }}>
        <View variant="row" style={{ gap: 8 }}>
          <ToggleText
            variant="pill"
            active={mode === "signIn"}
            onPress={() => setMode("signIn")}
          >
            Sign In
          </ToggleText>

          <ToggleText
            variant="pill"
            active={mode === "signUp"}
            onPress={() => setMode("signUp")}
          >
            Sign Up
          </ToggleText>
        </View>
      </View>

      <AuthForm
        mode={mode}
        onSubmit={handleSubmit}
        isLoading={isLoading}
        error={error ? ({ message: error } as Error) : null}
      />
    </Scroll>
  );
}
