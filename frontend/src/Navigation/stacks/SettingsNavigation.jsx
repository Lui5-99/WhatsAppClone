import React from "react";
import { Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  Settings,
  ChangeFirstname,
  ChangeLastname,
} from "../../screens/Settings/index";
import { screens } from "../../utils/index";
import { styles } from "../Styles.styles";

const Stack = createNativeStackNavigator();
export const SettingsNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ ...styles.stackNavigationStyles }}>
      <Stack.Screen
        name={screens.tabs.settings.settings}
        component={Settings}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={screens.tabs.settings.changeFirstname}
        component={ChangeFirstname}
        options={{
          title: "Cambiar nombre",
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name={screens.tabs.settings.changeLastname}
        component={ChangeLastname}
        options={{
          title: "Cambiar apellidos",
          presentation: "modal",
        }}
      />
    </Stack.Navigator>
  );
};
