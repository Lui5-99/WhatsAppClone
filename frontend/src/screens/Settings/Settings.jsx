import { SafeAreaView, View, Text } from "react-native";
import { useAuth } from "../../hooks";
import { UserInfo, Options } from "../../components/Settings";

export const Settings = () => {
  const { user, accessToken, logout, updatedUser } = useAuth();

  return (
    <SafeAreaView>
      <UserInfo user={user} />
      <Options
        accessToken={accessToken}
        logout={logout}
        updatedUser={updatedUser}
      />
    </SafeAreaView>
  );
};
