import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Avatar } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { map } from "lodash";
import { ENV } from "../../utils";
import { stylesChat } from "./styles";
import { Chat } from "../../api";
import { useAuth } from "../../hooks";

const chatController = new Chat();

export const ListUsers = ({ users }) => {
  const { accessToken, user } = useAuth();
  const navigation = useNavigation();
  const createChat = async (userData) => {
    try {
      await chatController.create(accessToken, user._id, userData._id);
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView style={stylesChat.content} showsVerticalScrollIndicator={false}>
      {map(users, (user) => (
        <TouchableOpacity
          key={user._id}
          style={stylesChat.item}
          onPress={() => createChat(user)}
        >
          <Avatar
            bg="cyan.500"
            marginRight={3}
            style={stylesChat.avatar}
            source={{ uri: user.avatar && `${ENV.BASE_PATH}/${user.avatar}` }}
          >
            {user.email.substring(0, 2).toUpperCase()}
          </Avatar>
          <View>
            {user.firstname || user.lastname ? (
              <>
                <Text style={stylesChat.info}>
                  {`${user.firstname || ""} ${user.lastname || ""}`}
                </Text>
                <Text style={stylesChat.email}>{user.email}</Text>
              </>
            ) : (
              <Text style={stylesChat.info}>{user.email}</Text>
            )}
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};
