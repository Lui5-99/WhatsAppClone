import { useRef } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Avatar } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { map } from "lodash";
import { ENV } from "../../utils";
import { styleMessages } from "./styles";
import { Chat } from "../../api";
import { useAuth } from "../../hooks";
import { ItemText } from "./ItemText";
import { ItemImage } from "./ItemImage";

export const ListMessages = ({ messages }) => {
  const scrollViewRef = useRef();
  return (
    <ScrollView
      style={styleMessages.container}
      alwaysBounceVertical={false}
      ref={scrollViewRef}
      onContentSizeChange={() => {
        scrollViewRef.current.scrollToEnd({ animated: false });
      }}
    >
      <View style={styleMessages.content}>
        {map(messages, (message) => {
          if (message.type === "TEXT") {
            return <ItemText key={message._id} message={message} />;
          } else {
            return <ItemImage key={message._id} message={message} />;
          }
        })}
      </View>
    </ScrollView>
  );
};
