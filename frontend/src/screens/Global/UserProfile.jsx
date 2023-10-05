import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Avatar, IconButton, CloseIcon } from "native-base";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { User } from "../../api";
import { useAuth } from "../../hooks";
import { userProfile } from "./styles";
import { ENV } from "../../utils";

const userController = new User();

export const UserProfile = () => {
  const { params } = useRoute();
  const { accessToken } = useAuth();
  const [profile, setProfile] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          icon={<CloseIcon />}
          padding={0}
          onPress={navigation.goBack}
        />
      ),
    });
  }, []);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await userController.getUser(
          accessToken,
          params.userId
        );
        setProfile(response);
      } catch (error) {
        console.error(error);
      }
    };
    getUser();
  }, [params.userId]);

  if (!profile) return null;

  return (
    <View style={userProfile.content}>
      <Avatar
        bg="cyan.500"
        size="xl"
        source={{ uri: profile.avatar && `${ENV.BASE_PATH}/${profile.avatar}` }}
      >
        {profile.email.substring(0, 2).toUpperCase()}
      </Avatar>
      {profile.firstname || profile.lastname ? (
        <Text style={userProfile.identity}>
          {`${profile.firstname || ""} ${profile.lastname || ""}`}
        </Text>
      ) : null}
      <Text style={userProfile.email}>{profile.email}</Text>
    </View>
  );
};
