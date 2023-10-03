import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { useFormik } from "formik";
import { Auth, User } from "../../api";
import { styleOptions } from "./styles";
import { useAuth } from "../../hooks";
import { ENV, imageFormat, screens } from "../../utils";

const userController = new User();

export const Options = ({ accessToken, logout, updatedUser }) => {
  const navigation = useNavigation();
  const openGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });
    if (!result.canceled) {
      const file = imageFormat(result.assets[0].uri);
      updateUserData({ avatar: file });
    }
  };

  const updateUserData = async (userData) => {
    try {
      const response = await userController.updateUser(accessToken, userData);
      updatedUser("avatar", response.avatar);
    } catch (error) {
      console.error(error);
    }
  };

  const goChangeFirstname = () => {
    navigation.navigate(screens.tabs.settings.changeFirstname);
  };

  const goChangeLastname = () => {
    navigation.navigate(screens.tabs.settings.changeFirstname);
  };

  return (
    <View style={styleOptions.content}>
      <TouchableOpacity style={styleOptions.item} onPress={openGallery}>
        <Text style={styleOptions.text}>Cambiar foto de perfil</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styleOptions.item}>
        <Text style={styleOptions.text} onPress={goChangeFirstname}>
          Cambiar nombre
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styleOptions.item}>
        <Text style={styleOptions.text} onPress={goChangeLastname}>
          Cambiar apellidos
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styleOptions.item, styleOptions.itemClose]}
        onPress={logout}
      >
        <Text style={styleOptions.textClose}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
};
