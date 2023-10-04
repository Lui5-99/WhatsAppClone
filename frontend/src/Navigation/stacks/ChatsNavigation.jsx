import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Chats, CreateChat } from "../../screens/Chats/index";
import { screens } from "../../utils/index";
import { styles } from "../Styles.styles";

const Stack = createNativeStackNavigator();
export const ChatsNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ ...styles.stackNavigationStyles }}>
      <Stack.Screen
        name={screens.tabs.chats.chats}
        component={Chats}
        options={{ title: "Chats" }}
      />
      <Stack.Screen
        name={screens.tabs.chats.createChat}
        component={CreateChat}
        options={{
          title: "Nuevo Chat",
          presentation: "modal",
          ...styles.modalStyles,
        }}
      />
    </Stack.Navigator>
  );
};
