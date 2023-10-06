import { View, Text, Pressable } from "react-native";
import { DateTime } from "luxon";
import { useAuth } from "../../hooks";
import React from "react";
import { styleImage, styleText } from "./styles";
import { ENV, screens } from "../../utils";
import AutoHeightImage from "react-native-auto-height-image";
import { useNavigation } from "@react-navigation/native";

export const ItemImage = ({ message }) => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const isMe = user._id === message.user._id;
  const styles = styleImage(isMe);
  const imgUrl = `${ENV.BASE_PATH}/${message.message}`;

  const openImage = () => {
    navigation.navigate(screens.global.imageFull, { uri: imgUrl });
  };

  return (
    <View style={styles.content}>
      <View style={styles.message}>
        <Pressable onPress={openImage}>
          <AutoHeightImage
            width={300}
            maxHeight={400}
            source={{ uri: imgUrl }}
            style={styles.image}
          />
        </Pressable>
        <Text style={styles.date}>
          {new DateTime.fromISO(
            new Date(message.createdAt).toISOString()
          ).toFormat("HH:mm")}
        </Text>
      </View>
    </View>
  );
};
