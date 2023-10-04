import { useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { IconButton, AddIcon } from "native-base";
import { screens } from "../../utils";
import { useAuth } from "../../hooks";
import { Chat } from "../../api";
import { LoadingScreen } from "../../components/Shared";
import { ListChats } from "../../components/Chat";
import { size } from "lodash";

const chatController = new Chat();

export const Chats = () => {
  const { accessToken } = useAuth();
  const navigation = useNavigation();
  const [chats, setChats] = useState(null);
  const [chatsResult, setChatsResult] = useState(null);
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          icon={<AddIcon />}
          padding={0}
          onPress={() => navigation.navigate(screens.tabs.chats.createChat)}
        />
      ),
    });
  }, []);

  useFocusEffect(
    useCallback(() => {
      const getChats = async () => {
        try {
          const response = await chatController.getAll(accessToken);
          setChats(response);
          setChatsResult(response);
        } catch (error) {
          console.error(error);
        }
      };
      getChats();
    }, [])
  );

  if (!chatsResult) return <LoadingScreen />;

  return (
    <View>
      <ListChats
        chats={size(chats) === size(chatsResult) ? chats : chatsResult}
      />
    </View>
  );
};
