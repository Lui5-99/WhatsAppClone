import React from "react";
import { Actionsheet, Icon } from "native-base";
import { optionGallery } from "../styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { ChatMessage } from "../../../api";
import { imageFormat } from "../../../utils";

const chatMessageController = new ChatMessage();

export const GalleryOption = ({ chatId, onClose, accessToken }) => {
  const openGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });
    if (!result.canceled) {
      sendImage(result.assets[0].uri);
    }
  };

  const sendImage = async (uri) => {
    try {
      const file = imageFormat(uri);
      const response = await chatMessageController.sendImage(
        accessToken,
        chatId,
        file
      );
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Actionsheet.Item
      style={[optionGallery.option, optionGallery.optionEnd]}
      _text={optionGallery.optionText}
      onPress={openGallery}
      startIcon={
        <Icon
          as={MaterialCommunityIcons}
          name="image"
          size={6}
          color="primary.500"
        />
      }
    >
      Galeria
    </Actionsheet.Item>
  );
};
