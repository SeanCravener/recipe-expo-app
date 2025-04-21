import { Tabs } from "expo-router";
import { useAuth } from "../../contexts/auth/AuthContext";
import { Permission } from "../../lib/permissions";

type TabConfig = {
  name: string;
  title: string;
  permission?: Permission;
};

const TAB_CONFIG: TabConfig[] = [
  { name: "index", title: "Home" },
  // { name: 'crafts', title: 'Crafts' },
  // { name: 'new-craft', title: 'New Craft', permission: Permission.CREATE_ITEM },
  // { name: 'favorites', title: 'Favorites', permission: Permission.FAVORITE_ITEM },
  { name: "profile", title: "Profile", permission: Permission.VIEW_PROFILE },
];

export default function TabsLayout() {
  const { session } = useAuth();

  const createAuthListener =
    (permission?: Permission) =>
    ({ navigation }: any) => ({
      tabPress: (e: any) => {
        if (permission && !session) {
          e.preventDefault();
          navigation.navigate("(auth)/sign-in");
        }
      },
    });

  return (
    <Tabs>
      {TAB_CONFIG.map(({ name, title, permission }) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            title,
          }}
          listeners={permission ? createAuthListener(permission) : undefined}
        />
      ))}
    </Tabs>
  );
}
