import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  SignInSchema,
  SignUpSchema,
  signInSchema,
  signUpSchema,
} from "@/lib/schemas";
import { useTheme } from "@/theme/hooks/useTheme";
import { Input, View, Text, Button, Error, Icon } from "@/components/ui";

interface AuthFormProps {
  mode: "signIn" | "signUp";
  onSubmit: (data: SignInSchema | SignUpSchema) => Promise<void>;
  isLoading: boolean;
  error?: Error | null;
  onSocialLogin?: (provider: "google" | "apple" | "facebook") => void;
}

export const AuthForm: React.FC<AuthFormProps> = ({
  mode,
  onSubmit,
  isLoading,
  error,
  onSocialLogin,
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

  const handleSocialLogin = (provider: "google" | "apple" | "facebook") => {
    if (onSocialLogin) {
      onSocialLogin(provider);
    } else {
      console.log(`${provider} login not implemented yet`);
    }
  };

  return (
    <View style={{ paddingHorizontal: 24, gap: 20 }}>
      {/* Email Field */}
      <Controller
        control={control}
        name="email"
        render={({ field: { value, onChange } }) => (
          <View>
            <Text
              variant="bodyNormalMedium"
              style={{
                marginBottom: 8,
                marginLeft: 4,
              }}
            >
              Email
            </Text>
            <Input
              variant="default"
              placeholder="Enter your email"
              autoCapitalize="none"
              keyboardType="email-address"
              value={value || ""}
              onChangeText={onChange}
              disabled={isLoading}
              error={!!errors.email}
              leftIcon="profile" // Using your available icons
              containerStyle={{
                backgroundColor: theme.colors.surface,
                borderRadius: theme.borderRadius.lg,
                borderWidth: 1,
                borderColor: errors.email
                  ? theme.colors.error
                  : theme.colors.outline,
                paddingVertical: 16,
                paddingHorizontal: 16,
              }}
            />
            {errors.email && (
              <View style={{ marginTop: 6 }}>
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
            <Text
              variant="bodyNormalMedium"
              style={{
                marginBottom: 8,
                marginLeft: 4,
              }}
            >
              Password
            </Text>
            <Input
              variant="default"
              placeholder="Enter your password"
              secureTextEntry={!showPassword}
              value={value || ""}
              onChangeText={onChange}
              disabled={isLoading}
              error={!!errors.password}
              leftIcon="settings" // Using available icon as lock substitute
              rightIcon={showPassword ? "favorite" : "favorite"} // Using available icons as eye substitute
              onRightIconPress={togglePassword}
              containerStyle={{
                backgroundColor: theme.colors.surface,
                borderRadius: theme.borderRadius.lg,
                borderWidth: 1,
                borderColor: errors.password
                  ? theme.colors.error
                  : theme.colors.outline,
                paddingVertical: 16,
                paddingHorizontal: 16,
              }}
            />
            {errors.password && (
              <View style={{ marginTop: 6 }}>
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
              <Text
                variant="bodyNormalMedium"
                style={{
                  marginBottom: 8,
                  marginLeft: 4,
                }}
              >
                Retype Password
              </Text>
              <Input
                variant="default"
                placeholder="Enter your password"
                secureTextEntry={!showConfirm}
                value={value || ""}
                onChangeText={onChange}
                disabled={isLoading}
                error={!!errors.confirmPassword}
                leftIcon="settings" // Using available icon as lock substitute
                rightIcon={showConfirm ? "favorite" : "favorite"} // Using available icons as eye substitute
                onRightIconPress={toggleConfirm}
                containerStyle={{
                  backgroundColor: theme.colors.surface,
                  borderRadius: theme.borderRadius.lg,
                  borderWidth: 1,
                  borderColor: errors.confirmPassword
                    ? theme.colors.error
                    : theme.colors.outline,
                  paddingVertical: 16,
                  paddingHorizontal: 16,
                }}
              />
              {errors.confirmPassword && (
                <View style={{ marginTop: 6 }}>
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

      {/* Sign In extras */}
      {mode === "signIn" && (
        <View
          variant="row"
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: -8,
            marginBottom: 8,
          }}
        >
          <View variant="row" style={{ alignItems: "center" }}>
            <View
              style={{
                width: 18,
                height: 18,
                borderRadius: 4,
                borderWidth: 1,
                borderColor: theme.colors.outline,
                marginRight: 8,
              }}
            />
            <Text variant="bodySmallRegular" color="onSurfaceVariant">
              Remember me
            </Text>
          </View>
          <Text variant="bodySmallMedium" color="primary">
            Forgot Password?
          </Text>
        </View>
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
        style={{
          paddingVertical: 16,
          borderRadius: theme.borderRadius.lg,
          marginTop: 8,
        }}
      >
        {mode === "signIn" ? "Sign in" : "Sign Up"}
      </Button>

      {/* Divider */}
      <View style={{ alignItems: "center", marginVertical: 8 }}>
        <Text variant="bodySmallRegular" color="onSurfaceVariant">
          Or
        </Text>
      </View>

      {/* Social Login Buttons */}
      <View style={{ gap: 12 }}>
        {/* Google */}
        <Button
          variant="outline"
          size="lg"
          onPress={() => handleSocialLogin("google")}
          disabled={isLoading}
          fullWidth
          style={{
            paddingVertical: 16,
            borderRadius: theme.borderRadius.lg,
            borderColor: theme.colors.outline,
          }}
        >
          <View variant="row" style={{ alignItems: "center" }}>
            <Text
              variant="bodyNormalMedium"
              color="primary"
              style={{ marginLeft: 8 }}
            >
              {mode === "signIn"
                ? "Sign in with Google"
                : "Sign up with Google"}
            </Text>
          </View>
        </Button>

        {/* Apple */}
        <Button
          variant="outline"
          size="lg"
          onPress={() => handleSocialLogin("apple")}
          disabled={isLoading}
          fullWidth
          style={{
            paddingVertical: 16,
            borderRadius: theme.borderRadius.lg,
            borderColor: theme.colors.outline,
          }}
        >
          <View variant="row" style={{ alignItems: "center" }}>
            <Text
              variant="bodyNormalMedium"
              color="onSurface"
              style={{ marginLeft: 8 }}
            >
              {mode === "signIn" ? "Sign in with Apple" : "Sign up with Apple"}
            </Text>
          </View>
        </Button>

        {/* Facebook */}
        <Button
          variant="outline"
          size="lg"
          onPress={() => handleSocialLogin("facebook")}
          disabled={isLoading}
          fullWidth
          style={{
            paddingVertical: 16,
            borderRadius: theme.borderRadius.lg,
            borderColor: theme.colors.outline,
          }}
        >
          <View variant="row" style={{ alignItems: "center" }}>
            <Text
              variant="bodyNormalMedium"
              color="primary"
              style={{ marginLeft: 8 }}
            >
              {mode === "signIn"
                ? "Sign in with Facebook"
                : "Sign up with Facebook"}
            </Text>
          </View>
        </Button>
      </View>
    </View>
  );
};
