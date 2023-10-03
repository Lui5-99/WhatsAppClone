import { SafeAreaView, View, Text, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { screens } from "../../utils";
import { assets } from "../../assets";
import { stylesAuth } from "./styles/index";

export function AuthStart() {
  const navigation = useNavigation();
  const goLogin = () => {
    navigation.navigate(screens.auth.login);
  };
  return (
    <SafeAreaView style={stylesAuth.content}>
      <Image source={assets.image.jpg.auth01} style={stylesAuth.img} />
      <View>
        <Text style={stylesAuth.title}>Te damos la bienvenida a ChatApp</Text>
        <Text style={stylesAuth.description}>
          Recomendamos usar este servicio con responsabilidad para disfrutar de
          la experiencia que proporciona esta app desarrollada con entusiasmo
        </Text>
        <Text style={stylesAuth.description}>
          Consulta nuestra Política de privacidad. Pulsa "Aceptar y continuar"
          para aceptar las condiciones del servicio
        </Text>
        <Text style={stylesAuth.btn} onPress={goLogin}>
          Aceptar y continuar
        </Text>
      </View>
    </SafeAreaView>
  );
}
