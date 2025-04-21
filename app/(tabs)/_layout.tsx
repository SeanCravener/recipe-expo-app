import { Tabs } from "expo-router";
import { useAuth } from "../../contexts/auth/AuthContext";

export default function TabsLayout() {
  const { session } = useAuth();

  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            if (!session) {
              e.preventDefault();
              navigation.navigate("(auth)/sign-in");
            }
          },
        })}
      />
    </Tabs>
  );
}
