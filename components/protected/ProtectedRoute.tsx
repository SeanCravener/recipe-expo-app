import { PropsWithChildren } from "react";
import { router } from "expo-router";
import { useAuth } from "../../contexts/auth/AuthContext";
import { Permission } from "../../lib/permissions";

interface ProtectedRouteProps extends PropsWithChildren {
  permission: Permission;
  redirectTo?: string;
}

export function ProtectedRoute({ children, permission }: ProtectedRouteProps) {
  const { session } = useAuth();

  if (!session && !Permission.VIEW_ITEMS) {
    router.replace("/sign-in");
    return null;
  }

  return <>{children}</>;
}
