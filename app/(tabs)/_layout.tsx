import React from "react";
import { Tabs } from "expo-router";
import { Icon } from "@/components/ui";
import { useTheme } from "@/theme/hooks/useTheme";
import { useAuth } from "@/contexts/auth/AuthContext";
import { Permission } from "@/lib/permissions";
import type { IconName } from "@/components/ui/Icon/Icon";

type TabConfig = {
  name: string;
  title: string;
  icon: IconName;
  permission?: Permission;
};

const TAB_CONFIG: TabConfig[] = [
  {
    name: "index",
    title: "Home",
    icon: "home",
  },
  {
    name: "search",
    title: "Search",
    icon: "search",
  },
  {
    name: "add-item",
    title: "Add",
    icon: "add",
    permission: Permission.CREATE_ITEM,
  },
  {
    name: "profile",
    title: "Profile",
    icon: "profile",
    permission: Permission.VIEW_PROFILE,
  },
];

export default function TabsLayout() {
  const { theme } = useTheme();
  const { session } = useAuth();

  // Modern auth handler - more declarative approach
  const handleTabPress = (permission?: Permission) => {
    return ({ navigation }: any) => ({
      tabPress: (e: any) => {
        if (permission && !session) {
          e.preventDefault();
          navigation.navigate("(auth)/auth");
        }
      },
    });
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.primaryContainer,
          borderTopWidth: 1,
          paddingBottom: 8,
          paddingTop: 8,
          height: 75,
          boxShadow: "0px 0px 8px 1px #A1D9DD",
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.onSurfaceVariant,
        tabBarLabelStyle: {
          fontSize: theme.fontSize.xs,
          fontWeight: theme.fontWeight.medium as any,
          marginTop: 4,
        },
      }}
    >
      {TAB_CONFIG.map(({ name, title, icon, permission }) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            title,
            tabBarIcon: ({ focused }) => (
              <Icon
                name={icon}
                variant={focused ? "filled" : "unfilled"}
                size="xl"
              />
            ),
          }}
          listeners={permission ? handleTabPress(permission) : undefined}
        />
      ))}
    </Tabs>
  );
}
