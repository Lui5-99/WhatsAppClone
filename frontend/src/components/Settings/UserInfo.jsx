import { View, Text } from "react-native";
import { Avatar } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { useFormik } from "formik";
import { Auth } from "../../api";
import { styles } from "./styles";
import { useAuth } from "../../hooks";
import { ENV } from "../../utils";

export const UserInfo = ({ user }) => {
  return (
    <View style={styles.content}>
      <Avatar
        bg="cyan.500"
        marginRight={3}
        size="xl"
        style={styles.avatar}
        source={{ uri: user.avatar && `${ENV.BASE_PATH}/${user.avatar}` }}
      >
        {user.email.substring(0, 2).toUpperCase()}
      </Avatar>
      {user.firstname || user.lastname ? (
        <Text style={styles.identity}>
          {`${user.firstname || ""} ${user.lastname || ""}`}
        </Text>
      ) : (
        <></>
      )}
      <Text style={styles.email}>{user.email}</Text>
    </View>
  );
};
