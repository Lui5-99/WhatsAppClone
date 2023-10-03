import React from "react";
import { View, Text } from "react-native";
import { AuthNavigation } from "./stacks/index";
import { AppNavigation } from "./AppNavigation";
import { useAuth } from "../hooks";

export const HandlerNavigation = () => {
  const { user } = useAuth();
  return user ? <AppNavigation /> : <AuthNavigation />;
};
