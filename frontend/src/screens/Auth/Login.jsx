import { SafeAreaView, View, Text, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { screens } from "../../utils";
import { stylesLogin } from "./styles/index";
import { LoginForm } from "../../components/Auth";

export function Login() {
  const navigation = useNavigation();
  const goRegister = () => {
    navigation.navigate(screens.auth.Register);
  };
  return (
    <View style={stylesLogin.content}>
      <Text style={stylesLogin.title}>Entra y empieza a conversar</Text>
      {/* Form Login */}
      <LoginForm />
      <Text style={stylesLogin.register} onPress={goRegister}>
        Registrate
      </Text>
      <Text style={stylesLogin.info}>
        Debes de tener al menos 16 años de edad para registrarte. Más
        información sobre como trabaja ChatApp en las políticas
      </Text>
    </View>
  );
}
