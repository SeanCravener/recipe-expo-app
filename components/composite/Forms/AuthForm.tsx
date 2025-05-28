import React from "react";
import { Pressable } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  SignInSchema,
  SignUpSchema,
  signInSchema,
  signUpSchema,
} from "@/lib/schemas";
import { useTheme } from "@/hooks/useTheme";
import { View, Text, Input } from "@/components/ui";

interface AuthFormProps {
  mode: "signIn" | "signUp";
  onSubmit: (data: SignInSchema | SignUpSchema) => Promise<void>;
  isLoading: boolean;
}

export const AuthForm: React.FC<AuthFormProps> = ({
  mode,
  onSubmit,
  isLoading,
}) => {
  const { theme } = useTheme();

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
    <View padding="lg" style={{ gap: theme.spacing.md }}>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <View style={{ gap: theme.spacing.xs }}>
            <Input
              placeholder="Email"
              autoCapitalize="none"
              keyboardType="email-address"
              value={value}
              onChangeText={onChange}
            />
            {errors.email && (
              <Text variant="label" color="error">
                {errors.email.message as string}
              </Text>
            )}
          </View>
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <View style={{ gap: theme.spacing.xs }}>
            <Input
              placeholder="Password"
              secureTextEntry
              value={value}
              onChangeText={onChange}
            />
            {errors.password && (
              <Text variant="label" color="error">
                {errors.password.message as string}
              </Text>
            )}
          </View>
        )}
      />

      {mode === "signUp" && (
        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { onChange, value } }) => (
            <View style={{ gap: theme.spacing.xs }}>
              <Input
                placeholder="Confirm Password"
                secureTextEntry
                value={value}
                onChangeText={onChange}
              />
              {errors.confirmPassword && (
                <Text variant="label" color="error">
                  {errors.confirmPassword.message as string}
                </Text>
              )}
            </View>
          )}
        />
      )}

      <Pressable
        onPress={handleSubmit(onSubmitHandler)}
        disabled={isLoading}
        style={{
          backgroundColor: theme.colors.primary,
          padding: theme.spacing.md,
          borderRadius: theme.borderRadius.md,
          alignItems: "center",
          marginTop: theme.spacing.sm,
          opacity: isLoading ? 0.5 : 1,
        }}
      >
        <Text variant="label" color="onPrimary" fontWeight="bold">
          {isLoading ? "Loading..." : mode === "signIn" ? "Sign In" : "Sign Up"}
        </Text>
      </Pressable>
    </View>
  );
};
