import { View, Text, Image, Platform } from "react-native";
import React, { useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { IconButton, CloseIcon } from "native-base";
import { imageFull } from "./styles";

export const ImageFull = () => {
  const { params } = useRoute();
  const navigation = useNavigation();
  return (
    <View style={imageFull.content}>
      <Image
        source={{ uri: params.uri }}
        style={{ height: "100%", width: "100%" }}
        resizeMode="contain"
      />
      {Platform.OS !== "ios" && (
        <IconButton
          icon={<CloseIcon />}
          style={imageFull.btn}
          padding={0}
          onPress={navigation.goBack}
        />
      )}
    </View>
  );
};
