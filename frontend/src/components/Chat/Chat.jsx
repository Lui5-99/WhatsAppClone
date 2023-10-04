import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Avatar } from "native-base";
import { ENV, screens } from "../../utils";
import { size } from "lodash";
import { stylesItem } from "./styles";
import { useAuth } from "../../hooks";
import { DateTime } from "luxon";
import { ChatMessage, UnreadMessages } from "../../api";
import { AlertConfirm } from "../Shared";

const chatMessageController = new ChatMessage();
const unreadMessagesController = new UnreadMessages();

export const Chat = ({ chat }) => {
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
    console.log(`Open -> ${_id}`);
  };
  const deleteChat = () => {
    console.log(`Delete -> ${_id}`);
  };

  return (
    <>
      <TouchableOpacity style={stylesItem.content} onPress={openChat}>
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
          {participant_two.email.substring(0, 2).toUpperCase()}
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
                {DateTime.fromISO(
                  new Date(lastMessage.createdAt).toISOString()
                ).toFormat("HH:MM")}
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
        textConfirm="Eliminar"
        onConfirm={deleteChat}
        message={`¿Estas seguro que quieres eliminar la conversación con ${
          userChat.firstname || userChat.lastname
            ? userChat.firstname || "" + userChat.lastname || ""
            : userChat.email
        }?`}
        isDanger
      />
    </>
  );
};
