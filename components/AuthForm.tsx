import { View, TextInput, Text, Pressable, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  SignInSchema,
  SignUpSchema,
  signInSchema,
  signUpSchema,
} from "../lib/schemas";

type AuthFormProps = {
  mode: "signIn" | "signUp";
  onSubmit: (data: SignInSchema | SignUpSchema) => Promise<void>;
  isLoading: boolean;
};

export function AuthForm({ mode, onSubmit, isLoading }: AuthFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(mode === "signIn" ? signInSchema : signUpSchema),
    defaultValues:
      mode === "signIn"
        ? { email: "", password: "" }
        : { email: "", password: "", confirmPassword: "" },
  });

  const onSubmitHandler = async (data: any) => {
    await onSubmit(data);
  };

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={onChange}
              value={value}
            />
            {errors.email && (
              <Text style={styles.errorText}>{errors.email.message}</Text>
            )}
          </View>
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              onChangeText={onChange}
              value={value}
            />
            {errors.password && (
              <Text style={styles.errorText}>{errors.password.message}</Text>
            )}
          </View>
        )}
      />

      {mode === "signUp" && (
        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { onChange, value } }) => (
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                secureTextEntry
                onChangeText={onChange}
                value={value}
              />
              {errors.confirmPassword && (
                <Text style={styles.errorText}>
                  {errors.confirmPassword.message as string}
                </Text>
              )}
            </View>
          )}
        />
      )}

      <Pressable
        style={[styles.button, isLoading && styles.buttonDisabled]}
        onPress={handleSubmit(onSubmitHandler)}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>
          {isLoading ? "Loading..." : mode === "signIn" ? "Sign In" : "Sign Up"}
        </Text>
      </Pressable>
    </View>
  );
}

// ... styles remain the same

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 10,
  },
  inputContainer: {
    gap: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
  },
  errorText: {
    color: "red",
    fontSize: 12,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
