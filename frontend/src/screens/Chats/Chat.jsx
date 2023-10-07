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
import { socket, io } from "../../utils";
import { ChatForm } from "../../components/Chat";

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

  useEffect(() => {
    socket.emit("subscribe", params.chatId);
    socket.on("message", newMessage);

    return () => {
      socket.emit("unsubscribe", params.chatId);
      socket.off("message", newMessage);
    };
  }, [params.chatId, messages]);

  const newMessage = (msg) => {
    setMessages([...messages, msg]);
  };

  return (
    <>
      <HeaderChat chatId={params.chatId} />
      {!messages ? (
        <LoadingScreen />
      ) : (
        <>
          <ListMessages messages={messages} />
          <ChatForm chatId={params.chatId} />
        </>
      )}
    </>
  );
};
