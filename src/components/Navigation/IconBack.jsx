import { View, Text } from "react-native";
import { ChevronLeftIcon, IconButton } from "native-base";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export const IconBack = () => {
  const navigation = useNavigation();

  return (
    <IconButton
      icon={<ChevronLeftIcon />}
      padding={0}
      onPress={navigation.goBack}
    />
  );
};
