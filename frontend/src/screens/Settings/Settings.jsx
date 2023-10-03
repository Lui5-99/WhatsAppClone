import { SafeAreaView, View, Text } from "react-native";
import React from "react";
import { Button } from "native-base";
import { useAuth } from "../../hooks";

export const Settings = () => {
  const { logout } = useAuth();

  return (
    <SafeAreaView>
      <Text>Settings</Text>
      <Button onPress={logout}>Cerrar Sesión</Button>
    </SafeAreaView>
  );
};
