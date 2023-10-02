import React from "react";
import { View, Text } from "react-native";
import { AuthNavigation } from "./stacks";

const AppNavigation = () => {
  return (
    <View>
      <Text>AppNavigation</Text>
    </View>
  );
};

export const HandlerNavigation = () => {
  const user = null;
  return user ? <AppNavigation /> : <AuthNavigation />;
};
