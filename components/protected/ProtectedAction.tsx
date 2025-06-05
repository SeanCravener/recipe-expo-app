import { PropsWithChildren } from "react";
import { View, Pressable, Text } from "react-native";
import { router } from "expo-router";
import { useAuth } from "../../contexts/auth/AuthContext";
import { Permission } from "../../lib/permissions";

interface ProtectedActionProps extends PropsWithChildren {
  permission: Permission;
  fallback?: React.ReactNode;
  onPress?: () => void;
}

export function ProtectedAction({
  children,
  permission,
  fallback,
  onPress,
}: ProtectedActionProps) {
  const { session } = useAuth();

  if (!session) {
    if (fallback) {
      return <>{fallback}</>;
    }

    return (
      <Pressable
        onPress={() => router.push("/auth")}
        style={styles.signInButton}
      >
        <Text style={styles.signInText}>
          Sign in to {getActionText(permission)}
        </Text>
      </Pressable>
    );
  }

  return <Pressable onPress={onPress}>{children}</Pressable>;
}

function getActionText(permission: Permission): string {
  switch (permission) {
    case Permission.FAVORITE_ITEM:
      return "favorite item";
    case Permission.CREATE_ITEM:
      return "create item";
    case Permission.EDIT_ITEM:
      return "edit item";
    case Permission.RATE_ITEM:
      return "rate item";
    default:
      return "access this feature";
  }
}

const styles = {
  signInButton: {
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
  signInText: {
    color: "#007AFF",
    textAlign: "center" as const,
  },
};
