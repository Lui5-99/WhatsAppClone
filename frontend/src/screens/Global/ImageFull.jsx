import { View, Text, Image } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";

export const ImageFull = () => {
  const { params } = useRoute();
  return (
    <View>
      <Image
        source={{ uri: params.uri }}
        style={{ height: "100%", width: "100%" }}
        resizeMode="contain"
      />
    </View>
  );
};
