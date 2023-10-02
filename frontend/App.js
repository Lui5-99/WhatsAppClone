import { NativeBaseProvider, Box, Button } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView, Text } from "react-native";

export default function App() {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <SafeAreaView>
          <Text>Chat App</Text>
          <Button>Click Me</Button>
        </SafeAreaView>
      </NativeBaseProvider>
    </NavigationContainer>
  );
}
