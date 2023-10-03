import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BottomTabNavigation } from "./BottomTabNavigation";
import { screens, initSocket } from "../utils/index";
import { UserProfile, Camera, ImageFull } from "../screens/Global/index";
import { Chat } from "../screens/Chats/index";
import {
  Group,
  GroupProfile,
  AddUserGroup,
  ChangeName,
} from "../screens/Groups/index";
import { styles } from "./Styles.styles";

initSocket();

const Stack = createNativeStackNavigator();
export const AppNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={screens.tabs.root}
        component={BottomTabNavigation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={screens.global.chat}
        component={Chat}
        options={{ headerShown: false, ...styles.stackNavigationStyles }}
      />
      <Stack.Screen
        name={screens.global.group}
        component={Group}
        options={{ headerShown: false, ...styles.stackNavigationStyles }}
      />
      <Stack.Group
        screenOptions={{ presentation: "modal", ...styles.modalStyles }}
      >
        <Stack.Screen
          name={screens.global.userProfile}
          component={UserProfile}
          options={{ title: "Info. del Usuario" }}
        />
        <Stack.Screen
          name={screens.global.groupProfile}
          component={GroupProfile}
          options={{ title: "Info. del Grupo" }}
        />
        <Stack.Screen
          name={screens.global.addUserGroup}
          component={AddUserGroup}
          options={{ title: "Añadir participantes" }}
        />
        <Stack.Screen
          name={screens.global.changeName}
          component={ChangeName}
          options={{ title: "Cambiar nombre del grupo" }}
        />
        <Stack.Screen
          name={screens.global.camera}
          component={Camera}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={screens.global.imageFull}
          component={ImageFull}
          options={{ headerShown: false }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};
