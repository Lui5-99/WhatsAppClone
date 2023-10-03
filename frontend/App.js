import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { NativeBaseProvider, Box } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { HandlerNavigation } from "./src/Navigation/index";
import { AuthProvider } from "./src/context";

export default function App() {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <AuthProvider>
          <HandlerNavigation />
        </AuthProvider>
      </NativeBaseProvider>
    </NavigationContainer>
  );
}
