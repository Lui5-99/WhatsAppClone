import React from "react";
import { Actionsheet, Icon } from "native-base";
import { optionCamera } from "../styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Camera } from "expo-camera";
import { ChatMessage } from "../../../api";
import { imageFormat, screens } from "../../../utils";
import { useNavigation } from "@react-navigation/native";

export const CameraOption = ({ chatId, onClose, accessToken }) => {
  const navigation = useNavigation();
  const openCamera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status !== "granted") {
      console.log("No tiene permisos para acceder a la camara");
    } else {
      onClose();
      navigation.navigate(screens.global.camera, {
        type: "chat",
        id: chatId,
      });
    }
  };
  return (
    <Actionsheet.Item
      style={[optionCamera.option, optionCamera.optionEnd]}
      _text={optionCamera.optionText}
      onPress={openCamera}
      startIcon={
        <Icon
          as={MaterialCommunityIcons}
          name="camera"
          size={6}
          color="primary.500"
        />
      }
    >
      Camara
    </Actionsheet.Item>
  );
};
