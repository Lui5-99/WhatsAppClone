import { Text, View, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { map, size } from "lodash";
import { ENV } from "../../utils";
import { stylesList } from "./styles";
import { Chat } from "../../api";
import { useAuth } from "../../hooks";
import { Chat as ChatComponent } from "./Chat";

export const ListChats = ({ chats, onReload, upToChat }) => {
  return (
    <ScrollView alwaysBounceVertical={false}>
      <View style={stylesList.content}>
        {size(chats) === 0 ? (
          <Text style={stylesList.noChats}>
            No tienes ningun chat, (+) y empieza una nueva conversación
          </Text>
        ) : (
          map(chats, (chat) => (
            <ChatComponent
              key={chat._id}
              chat={chat}
              onReload={onReload}
              upToChat={upToChat}
            />
          ))
        )}
      </View>
    </ScrollView>
  );
};
