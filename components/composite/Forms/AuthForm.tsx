import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  SignInSchema,
  SignUpSchema,
  signInSchema,
  signUpSchema,
} from "@/lib/schemas";
import { useTheme } from "@/hooks/useTheme";
import { Input, View, Text, Button, Icon } from "@/components/ui";

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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

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

  const togglePassword = () => setShowPassword((prev) => !prev);
  const toggleConfirm = () => setShowConfirm((prev) => !prev);

  const handleSubmitForm = async (data: any) => {
    await onSubmit(data);
  };

  return (
    <View padding="lg" style={{ gap: theme.spacing.lg }}>
      {/* Email Field */}
      <Controller
        control={control}
        name="email"
        render={({ field: { value, onChange } }) => (
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

      {/* Password Field */}
      <Controller
        control={control}
        name="password"
        render={({ field: { value, onChange } }) => (
          <View style={{ gap: theme.spacing.xs }}>
            <Input
              placeholder="Password"
              secureTextEntry={!showPassword}
              value={value}
              onChangeText={onChange}
              containerStyle={{ position: "relative" }}
            />
            <Icon
              name={showPassword ? "eye-off" : "eye"}
              onPress={togglePassword}
              size={20}
              style={{
                position: "absolute",
                right: theme.spacing.md,
                top: theme.spacing.sm,
              }}
            />
            {errors.password && (
              <Text variant="label" color="error">
                {errors.password.message as string}
              </Text>
            )}
          </View>
        )}
      />

      {/* Confirm Password Field (Sign Up Only) */}
      {mode === "signUp" && (
        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { value, onChange } }) => (
            <View style={{ gap: theme.spacing.xs }}>
              <Input
                placeholder="Confirm Password"
                secureTextEntry={!showConfirm}
                value={value}
                onChangeText={onChange}
                containerStyle={{ position: "relative" }}
              />
              <Icon
                name={showConfirm ? "eye-off" : "eye"}
                onPress={toggleConfirm}
                size={20}
                style={{
                  position: "absolute",
                  right: theme.spacing.md,
                  top: theme.spacing.sm,
                }}
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

      {/* Submit Button */}
      <Button
        title={
          isLoading ? "Loading..." : mode === "signIn" ? "Sign In" : "Sign Up"
        }
        onPress={handleSubmit(handleSubmitForm)}
        disabled={isLoading}
        size="lg"
        elevation="level1"
      />
    </View>
  );
};
