import { View, Text, Pressable } from "react-native";
import { DateTime } from "luxon";
import { useAuth } from "../../hooks";
import React from "react";
import { styleImage, styleText } from "./styles";
import { ENV } from "../../utils";

export const ItemImage = ({ message }) => {
  const { user } = useAuth();
  const isMe = user._id === message.user._id;
  const styles = styleImage(isMe);
  return (
    <View style={styles.content}>
      <View style={styles.message}>
        <Text style={styles.textMessage}>{message.message}</Text>
        <Text style={styles.date}>
          {new DateTime.fromISO(
            new Date(message.createdAt).toISOString()
          ).toFormat("HH:mm")}
        </Text>
      </View>
    </View>
  );
};
