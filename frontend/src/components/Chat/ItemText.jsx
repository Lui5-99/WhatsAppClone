import { View, Text } from "react-native";
import { DateTime } from "luxon";
import { useAuth } from "../../hooks";
import React from "react";
import { styleText } from "./styles";

export const ItemText = ({ message }) => {
  const { user } = useAuth();
  const isMe = user._id === message.user._id;
  const styles = styleText(isMe);
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
