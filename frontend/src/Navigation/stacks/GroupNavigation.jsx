import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Group, CreateGroup } from "../../screens/Groups/index";
import { screens } from "../../utils/index";
import { styles } from "../Styles.styles";

const Stack = createNativeStackNavigator();
export const GroupNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ ...styles.stackNavigationStyles }}>
      <Stack.Screen
        name={screens.tabs.groups.group}
        component={Group}
        options={{ title: "Grupos" }}
      />
      <Stack.Screen
        name={screens.tabs.groups.createGroup}
        component={CreateGroup}
        options={{
          title: "Nuevo Grupo",
          presentation: "modal",
          ...styles.modalStyles,
        }}
      />
    </Stack.Navigator>
  );
};
