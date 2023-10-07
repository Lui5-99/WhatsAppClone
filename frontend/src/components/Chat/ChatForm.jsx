import { View, Text, Keyboard, Platform } from "react-native";
import { Input, IconButton, Icon } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { input } from "./styles";
import { useEffect, useState } from "react";
import { initialValues, validationSchema } from "./ChatForm.Form";
import { useFormik } from "formik";
import { ChatMessage } from "../../api";
import { useAuth } from "../../hooks";
import { SendMedia } from "./SendMedia";

const chatMessageController = new ChatMessage();

export const ChatForm = ({ chatId }) => {
  const { accessToken } = useAuth();
  const [keyboardPositon, setKeyboardPositon] = useState(0);
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: (values) => handleMessage(values),
  });
  useEffect(() => {
    const showKeyBoard = Keyboard.addListener("keyboardDidShow", (e) => {
      if (Platform.isPad) {
        const { startCoordinates } = e;
        const bottom = startCoordinates.height + 50;
        setKeyboardPositon(bottom);
      } else if (Platform.OS === "ios") {
        const { startCoordinates } = e;
        const bottom = startCoordinates.height + 65;
        setKeyboardPositon(bottom);
      }
    });
    const hideKeyBoard = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardPositon(0);
    });
    return () => {
      showKeyBoard.remove();
      hideKeyBoard.remove();
    };
  }, []);
  const handleMessage = async (data) => {
    try {
      setKeyboardPositon(0);
      Keyboard.dismiss();
      formik.handleReset();
      const response = await chatMessageController.sendText(
        accessToken,
        chatId,
        data.message
      );
      return response;
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View style={[input.content, { bottom: keyboardPositon }]}>
      <SendMedia chatId={chatId} />
      <View style={input.inputContainer}>
        <Input
          style={input.input}
          placeholder="Enviar mensaje"
          variant="unstyled"
          value={formik.values.message}
          onChangeText={(text) => formik.setFieldValue("message", text)}
          onEndEditing={!formik.isSubmitting && formik.handleSubmit}
        />
        <IconButton
          icon={<Icon as={MaterialCommunityIcons} name="send" />}
          padding={0}
          style={input.send}
          value={formik.values.message}
          onPress={!formik.isSubmitting && formik.handleSubmit}
        />
      </View>
    </View>
  );
};
