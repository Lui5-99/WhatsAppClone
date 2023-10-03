import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  ChatsNavigation,
  GroupNavigation,
  SettingsNavigation,
} from "../stacks/index";
import { screens } from "../../utils";
import { styles } from "./BottomTabNavigation.styles";

const Tab = createBottomTabNavigator();
export const BottomTabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: styles.tabBarStyle,
        tabBarInactiveTintColor: "#646464",
        tabBarActiveTintColor: "#0891b2",
        tabBarIcon: ({ color, size }) => screenIcon(route, color),
      })}
    >
      <Tab.Screen
        name={screens.tabs.chats.root}
        component={ChatsNavigation}
        options={{ title: "Chats" }}
      />
      <Tab.Screen
        name={screens.tabs.groups.root}
        component={GroupNavigation}
        options={{ title: "Groups" }}
      />
      <Tab.Screen
        name={screens.tabs.settings.root}
        component={SettingsNavigation}
        options={{ title: "Settings" }}
      />
    </Tab.Navigator>
  );
};

const screenIcon = (route, color, size) => {
  let iconName;
  if (route.name === screens.tabs.chats.root) {
    iconName = "chat";
  }
  if (route.name === screens.tabs.groups.root) {
    iconName = "account-group";
  }
  if (route.name === screens.tabs.settings.root) {
    iconName = "cog-outline";
  }
  return (
    <Icon
      as={MaterialCommunityIcons}
      name={iconName}
      color={color}
      size={size}
    />
  );
};
