import { SafeAreaView, View, Text, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { screens } from "../../utils";
import { stylesRegister } from "./styles/index";
import { RegisterForm } from "../../components/Auth";

export function Register() {
  const navigation = useNavigation();
  return (
    <View style={stylesRegister.content}>
      <Text style={stylesRegister.title}>
        Crea tu cuenta y empiza a enviar mensajes
      </Text>
      {/* Form Register */}
      <RegisterForm />
      <Text style={stylesRegister.login} onPress={navigation.goBack}>
        Iniciar Sesión
      </Text>
    </View>
  );
}
