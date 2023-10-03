import React from "react";
import { View, Text } from "react-native";
import { AuthNavigation } from "./stacks/index";
import { AppNavigation } from "./AppNavigation";

export const HandlerNavigation = () => {
  const user = { name: 2 };
  return user ? <AppNavigation /> : <AuthNavigation />;
};
