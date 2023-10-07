import { useState } from "react";
import { View, Text } from "react-native";
import { IconButton, CloseIcon, Icon, Image, Spinner } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { captureImage } from "./styles";
import { ChatMessage } from "../../api";
import { useAuth } from "../../hooks";
import { imageFormat } from "../../utils";

const chatMessageController = new ChatMessage();

export const PhotoCapture = ({ photo, type, id }) => {
  const [loading, setLoading] = useState(false);
  const { accessToken } = useAuth();
  const navigation = useNavigation();
  const sendMedia = async () => {
    try {
      setLoading(true);
      const file = imageFormat(photo.uri);
      if (type === "chat") {
        const response = await chatMessageController.sendImage(
          accessToken,
          id,
          file
        );
        return response;
      }
      if (type === "group") {
        return;
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      navigation.goBack();
    }
  };
  return (
    <View style={captureImage.container}>
      <Image
        source={{ uri: photo.uri }}
        alt="photo"
        style={captureImage.photo}
      />
      <View style={captureImage.topAction}>
        <IconButton
          icon={
            <Icon
              as={MaterialCommunityIcons}
              name="camera"
              style={{ color: "transparent" }}
            />
          }
        />
        <IconButton
          onPress={navigation.goBack}
          icon={<CloseIcon style={captureImage.icon} size={6} />}
        />
      </View>
      <View style={captureImage.bottomAction}>
        <IconButton
          icon={
            <Icon
              as={MaterialCommunityIcons}
              name="camera"
              style={{ color: "transparent" }}
            />
          }
        />
        {loading ? (
          <Spinner size="lg" />
        ) : (
          <IconButton
            icon={
              <Icon
                as={MaterialCommunityIcons}
                size={20}
                name="check-circle-outline"
                style={captureImage.icon}
              />
            }
            onPress={sendMedia}
          />
        )}
        <IconButton
          icon={
            <Icon
              as={MaterialCommunityIcons}
              name="camera"
              style={{ color: "transparent" }}
            />
          }
        />
      </View>
    </View>
  );
};
