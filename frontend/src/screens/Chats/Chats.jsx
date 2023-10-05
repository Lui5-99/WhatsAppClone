import { useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { IconButton, AddIcon } from "native-base";
import { screens } from "../../utils";
import { useAuth } from "../../hooks";
import { Chat } from "../../api";
import { LoadingScreen } from "../../components/Shared";
import { ListChats, Search } from "../../components/Chat";
import { size } from "lodash";

const chatController = new Chat();

export const Chats = () => {
  const { accessToken } = useAuth();
  const navigation = useNavigation();
  const [chats, setChats] = useState(null);
  const [chatsResult, setChatsResult] = useState(null);
  const [reload, setReload] = useState(false);

  const onReload = () => setReload((prevState) => !prevState);

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
          const result = response.sort((a, b) => {
            return (
              new Date(b.last_message_date) - new Date(a.last_message_date)
            );
          });
          setChats(result);
          setChatsResult(result);
        } catch (error) {
          console.error(error);
        }
      };
      getChats();
    }, [reload])
  );

  const upToChat = (chat_id) => {
    const data = chatsResult;
    const formIndex = data.map((chat) => chat._id).indexOf(chat_id);
    const toIndex = 0;
    const element = data.splice(formIndex, 1)[0];
    data.splice(toIndex, 0, element);
    setChats([...data]);
  };

  if (!chatsResult) return <LoadingScreen />;

  return (
    <View>
      {size(chats) > 0 && <Search data={chats} setData={setChatsResult} />}
      <ListChats
        chats={size(chats) === size(chatsResult) ? chats : chatsResult}
        onReload={onReload}
        upToChat={upToChat}
      />
    </View>
  );
};
