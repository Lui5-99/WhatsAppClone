import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthStart, Login, Register } from "../../screens/Auth";
import { screens } from "../../utils";
import { IconBack } from "../../components/Navigation/IconBack";

const Stack = createNativeStackNavigator();
export const AuthNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerLeft: IconBack,
      }}
    >
      <Stack.Screen
        name={screens.auth.authStart}
        component={AuthStart}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={screens.auth.login}
        component={Login}
        options={{ title: "Iniciar Sesion" }}
      />
      <Stack.Screen
        name={screens.auth.Register}
        component={Register}
        options={{ title: "Registro" }}
      />
    </Stack.Navigator>
  );
};
