import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BottomTabNavigation } from "./BottomTabNavigation";
import { screens } from "../utils/index";

const Stack = createNativeStackNavigator();
export const AppNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={screens.tabs.root}
        component={BottomTabNavigation}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
