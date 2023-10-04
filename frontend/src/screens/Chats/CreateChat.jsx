import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { IconButton, CloseIcon } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { User } from "../../api";
import { useAuth } from "../../hooks";
import { CreateChatComponent, Search } from "../../components/Chat";

const userController = new User();

export const CreateChat = () => {
  const { accessToken } = useAuth();
  const navigation = useNavigation();
  const [users, setUsers] = useState(null);
  const [usersResult, setUsersResult] = useState(null);
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          icon={<CloseIcon />}
          padding={0}
          onPress={navigation.goBack}
        />
      ),
    });
  }, []);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await userController.getAll(accessToken);
        setUsers(response);
        setUsersResult(response);
      } catch (error) {
        console.error(error);
      }
    };
    getUsers();
  }, []);

  if (!usersResult) return null;

  return (
    <View>
      <Search data={users} setData={setUsersResult} />
      <CreateChatComponent.ListUsers users={usersResult} />
    </View>
  );
};
