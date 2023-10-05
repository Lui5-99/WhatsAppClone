import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Avatar } from "native-base";
import { ENV, screens, socket } from "../../utils";
import { size } from "lodash";
import { stylesItem } from "./styles";
import { useAuth } from "../../hooks";
import { DateTime } from "luxon";
import { ChatMessage, UnreadMessages, Chat as ChatController } from "../../api";
import { AlertConfirm } from "../Shared";
import AsyncStorage from "@react-native-async-storage/async-storage";

const chatMessageController = new ChatMessage();
const chatController = new ChatController();
const unreadMessagesController = new UnreadMessages();

export const Chat = ({ chat, onReload, upToChat }) => {
  const navigation = useNavigation();
  const { accessToken, user } = useAuth();
  const { _id, participant_one, participant_two, last_message_date } = chat;
  const [lastMessage, setLastMessage] = useState(null);
  const [totalUnreadMessages, setTotalUnreadMessages] = useState(0);
  const [showDelete, setShowDelete] = useState(false);

  useEffect(() => {
    const getTotal = async () => {
      try {
        const response = await chatMessageController.getTotal(accessToken, _id);
        const totalReadMessages =
          await unreadMessagesController.getTotalReadMessages(_id);
        setTotalUnreadMessages(response - totalReadMessages);
      } catch (error) {
        console.log(error);
      }
    };
    getTotal();
  }, [_id]);
  useEffect(() => {
    const getMessage = async () => {
      try {
        const response = await chatMessageController.getLastMessage(
          accessToken,
          _id
        );
        if (response) setLastMessage(response);
        else setLastMessage(null);
      } catch (error) {
        console.log(error);
      }
    };
    getMessage();
  }, [_id]);
  const userChat =
    user._id === participant_one._id ? participant_two : participant_one;
  const openCloseDelete = () => setShowDelete((prevState) => !prevState);
  const openChat = () => {
    setTotalUnreadMessages(0);
    navigation.navigate(screens.global.chat, { chatId: _id });
  };
  const deleteChat = async () => {
    try {
      await chatController.remove(accessToken, _id);
      openCloseDelete();
      onReload();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    socket.emit("subscribe", `${_id}_notify`);
    socket.on("message_notify", newMessage);
  }, []);

  const newMessage = async (newMessage) => {
    if (newMessage.chat === _id) {
      if (newMessage.user._id !== user._id) {
        upToChat(newMessage.chat);
        setLastMessage(newMessage);
        const active_chat_id = await AsyncStorage.getItem(ENV.ACTIVE_CHAT_ID);
        if (active_chat_id !== newMessage.chat) {
          setTotalUnreadMessages((prevState) => prevState + 1);
        }
      }
    }
  };

  return (
    <>
      <TouchableOpacity
        style={stylesItem.content}
        onPress={openChat}
        onLongPress={openCloseDelete}
      >
        <Avatar
          bg="cyan.500"
          marginRight={3}
          style={stylesItem.avatar}
          size="lg"
          styles={stylesItem.avatar}
          source={{
            uri: userChat.avatar && `${ENV.BASE_PATH}/${userChat.avatar}`,
          }}
        >
          {userChat.email.substring(0, 2).toUpperCase()}
        </Avatar>
        <View style={stylesItem.infoContent}>
          <View style={stylesItem.info}>
            <Text style={stylesItem.identity}>
              {userChat.firstname || userChat.lastname
                ? `${userChat.firstname || ""} ${userChat.lastname || ""}`
                : userChat.email}
            </Text>
            <Text style={stylesItem.message} numberOfLines={2}>
              {lastMessage?.message}
            </Text>
          </View>
          <View style={stylesItem.notify}>
            {lastMessage?.message ? (
              <Text style={stylesItem.time}>
                {new DateTime.fromISO(
                  new Date(lastMessage.createdAt).toISOString()
                ).toFormat("HH:mm")}
              </Text>
            ) : null}
            {totalUnreadMessages > 0 ? (
              <View style={stylesItem.unReadContent}>
                <Text style={stylesItem.unRead}>
                  {totalUnreadMessages < 99 ? totalUnreadMessages : "+99"}
                </Text>
              </View>
            ) : null}
          </View>
        </View>
      </TouchableOpacity>
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
        }? (Esta acción tambien aplicara a la otra persona)`}
        isDanger
      />
    </>
  );
};
