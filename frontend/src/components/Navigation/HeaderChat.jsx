import { useState, useEffect } from "react";
import { useAuth } from "../../hooks";
import { View, Text, SafeAreaView, Pressable } from "react-native";
import { IconButton, ChevronLeftIcon, DeleteIcon, Avatar } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { Chat } from "../../api";
import { header } from "./styles";
import { ENV, screens } from "../../utils";
import { AlertConfirm } from "../../components/Shared";

const chatController = new Chat();

export const HeaderChat = ({ chatId }) => {
  const { accessToken, user } = useAuth();
  const [userChat, setUserChat] = useState(null);
  const [showDelete, setShowDelete] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const getInfo = async () => {
      try {
        const response = await chatController.obtain(accessToken, chatId);
        const otherUser =
          user._id === response.participant_one._id
            ? response.participant_two
            : response.participant_one;
        setUserChat(otherUser);
      } catch (error) {
        console.error(error);
      }
    };
    getInfo();
  }, [chatId]);
  const openCloseDelete = () => setShowDelete((prevState) => !prevState);
  const deleteChat = async () => {
    try {
      await chatController.remove(accessToken, chatId);
      openCloseDelete();
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };

  const goToUserProfile = () => {
    navigation.navigate(screens.global.userProfile, { userId: userChat._id });
  };

  return (
    <>
      <SafeAreaView style={header.container}>
        <View style={header.content}>
          <View style={header.info}>
            <IconButton
              icon={<ChevronLeftIcon />}
              padding={0}
              onPress={navigation.goBack}
            />
            {userChat && (
              <Pressable onPress={goToUserProfile} style={header.info}>
                <Avatar
                  bg="cyan.500"
                  marginRight={3}
                  size="sm"
                  style={header.avatar}
                  source={{
                    uri:
                      userChat.avatar && `${ENV.BASE_PATH}/${userChat.avatar}`,
                  }}
                >
                  {userChat.email.substring(0, 2).toUpperCase()}
                </Avatar>
                <Text style={header.identity}>
                  {userChat.firstname || userChat.lastname
                    ? `${userChat.firstname || ""} ${userChat.lastname || ""}`
                    : userChat.email}
                </Text>
              </Pressable>
            )}
          </View>
          <View>
            <IconButton
              icon={<DeleteIcon />}
              padding={0}
              onPress={openCloseDelete}
            />
          </View>
        </View>
      </SafeAreaView>
      {userChat && (
        <AlertConfirm
          show={showDelete}
          onClose={openCloseDelete}
          title="Eliminar Chat"
          textConfirm="Si, eliminar este chat"
          onConfirm={deleteChat}
          message={`¿Estas seguro que quieres eliminar la conversación con ${
            userChat.firstname || userChat.lastname
              ? userChat.firstname || "" + userChat.lastname || ""
              : userChat.email
          }? (Esta acción tambien afectara a la otra persona)`}
          isDanger
        />
      )}
    </>
  );
};
