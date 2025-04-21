import { View, Text, Pressable, StyleSheet } from "react-native";
import { Link, router } from "expo-router";
import { AuthForm } from "../../components/AuthForm";
import { useAuth } from "../../contexts/auth/AuthContext";
import type { SignUpSchema, SignInSchema } from "../../lib/schemas";
import { useState } from "react";

export default function SignUp() {
  const { signUp } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: SignUpSchema) => {
    try {
      setIsLoading(true);
      setError(null);
      await signUp(formData.email, formData.password);
      router.replace("/");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An error occurred during sign up"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {error && <Text style={styles.errorText}>{error}</Text>}
      <AuthForm
        mode="signUp"
        onSubmit={
          handleSubmit as (data: SignInSchema | SignUpSchema) => Promise<void>
        }
        isLoading={isLoading}
      />
      <View style={styles.footer}>
        <Text>Already have an account? </Text>
        <Link href="/sign-in" asChild>
          <Pressable>
            <Text style={styles.link}>Sign In</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 20,
  },
  link: {
    color: "#007AFF",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    padding: 10,
    marginTop: 10,
  },
});
