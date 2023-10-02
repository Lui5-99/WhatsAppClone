import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { NativeBaseProvider, Box } from "native-base";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <SafeAreaView>
          <Box>AppChat</Box>
        </SafeAreaView>
      </NativeBaseProvider>
    </NavigationContainer>
  );
}
