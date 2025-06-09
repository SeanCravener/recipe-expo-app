import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import {
  SignInSchema,
  SignUpSchema,
  signInSchema,
  signUpSchema,
} from "@/lib/schemas";
import { useTheme } from "@/theme/hooks/useTheme";
import { Input, View, Text, Button, Error } from "@/components/ui";

interface AuthFormProps {
  mode: "signIn" | "signUp";
  onSubmit: (data: SignInSchema | SignUpSchema) => Promise<void>;
  isLoading: boolean;
  error?: Error | null;
}

export const AuthForm: React.FC<AuthFormProps> = ({
  mode,
  onSubmit,
  isLoading,
  error,
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
    <View padding="lg" style={{ gap: 24 }}>
      {/* Email Field */}
      <Controller
        control={control}
        name="email"
        render={({ field: { value, onChange } }) => (
          <View>
            <Input
              variant="default"
              placeholder="Email"
              autoCapitalize="none"
              keyboardType="email-address"
              value={value || ""}
              onChangeText={onChange}
            />
            {errors.email && (
              <View style={{ marginTop: 4 }}>
                <Error
                  variant="text"
                  message={errors.email.message as string}
                />
              </View>
            )}
          </View>
        )}
      />

      {/* Password Field */}
      <Controller
        control={control}
        name="password"
        render={({ field: { value, onChange } }) => (
          <View>
            <View style={{ position: "relative" }}>
              <Input
                variant="default"
                placeholder="Password"
                secureTextEntry={!showPassword}
                value={value || ""}
                onChangeText={onChange}
              />
              <Pressable
                onPress={togglePassword}
                style={{
                  position: "absolute",
                  right: 12,
                  top: 12,
                  padding: 4,
                }}
              >
                <MaterialIcons
                  name={showPassword ? "visibility-off" : "visibility"}
                  size={20}
                  color={theme.colors.onSurfaceVariant}
                />
              </Pressable>
            </View>
            {errors.password && (
              <View style={{ marginTop: 4 }}>
                <Error
                  variant="text"
                  message={errors.password.message as string}
                />
              </View>
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
            <View>
              <View style={{ position: "relative" }}>
                <Input
                  variant="default"
                  placeholder="Confirm Password"
                  secureTextEntry={!showConfirm}
                  value={value || ""}
                  onChangeText={onChange}
                />
                <Pressable
                  onPress={toggleConfirm}
                  style={{
                    position: "absolute",
                    right: 12,
                    top: 12,
                    padding: 4,
                  }}
                >
                  <MaterialIcons
                    name={showConfirm ? "visibility-off" : "visibility"}
                    size={20}
                    color={theme.colors.onSurfaceVariant}
                  />
                </Pressable>
              </View>
              {errors.confirmPassword && (
                <View style={{ marginTop: 4 }}>
                  <Error
                    variant="text"
                    message={errors.confirmPassword.message as string}
                  />
                </View>
              )}
            </View>
          )}
        />
      )}

      {/* Error Display */}
      {error && (
        <Error variant="box" message={error.message || "An error occurred"} />
      )}

      {/* Submit Button */}
      <Button
        variant="primary"
        size="lg"
        onPress={handleSubmit(handleSubmitForm)}
        disabled={isLoading}
        loading={isLoading}
        fullWidth
      >
        {mode === "signIn" ? "Sign In" : "Sign Up"}
      </Button>
    </View>
  );
};
