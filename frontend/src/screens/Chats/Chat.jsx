import { Text } from "react-native";
import React, { useEffect, useState } from "react";
import { View } from "native-base";
import { HeaderChat } from "../../components/Navigation";
import { useRoute } from "@react-navigation/native";
import { useAuth } from "../../hooks";
import { ChatMessage, UnreadMessages } from "../../api";
import { LoadingScreen } from "../../components/Shared";
import { ENV } from "../../utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ListMessages } from "../../components/Chat/ListMessages";

const chatMessageController = new ChatMessage();
const unReadMessagesController = new UnreadMessages();

export const Chat = () => {
  const { params } = useRoute();
  const { accessToken, user } = useAuth();
  const [messages, setMessages] = useState(null);

  useEffect(() => {
    const setActive = async () => {
      await AsyncStorage.setItem(ENV.ACTIVE_CHAT_ID, params.chatId);
    };
    setActive();
    return async () => {
      await AsyncStorage.removeItem(ENV.ACTIVE_CHAT_ID);
    };
  }, [params.chatId]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const response = await chatMessageController.getAll(
          accessToken,
          params.chatId
        );
        setMessages(response.messages);
        unReadMessagesController.setTotalReadMessages(
          params.chatId,
          response.total
        );
      } catch (error) {
        console.error(error);
      }
      return async () => {
        const response = await chatMessageController.getAll(
          accessToken,
          params.chatId
        );
        unReadMessagesController.setTotalReadMessages(
          params.chatId,
          response.total
        );
      };
    };
    getMessages();
  }, [params.chatId]);

  return (
    <>
      <HeaderChat chatId={params.chatId} />
      {!messages ? (
        <LoadingScreen />
      ) : (
        <View>
          <ListMessages messages={messages} />
        </View>
      )}
    </>
  );
};
