import { View, Text, Keyboard, Platform } from "react-native";
import { Input, IconButton, Icon } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { input } from "./styles";
import { useEffect, useState } from "react";
import { initialValues, validationSchema } from "./ChatForm.Form";
import { useFormik } from "formik";

export const ChatForm = ({ chatId }) => {
  const [keyboardPositon, setKeyboardPositon] = useState(0);
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: (values) => console.log("Send?"),
  });
  useEffect(() => {
    const showKeyBoard = Keyboard.addListener("keyboardDidShow", (e) => {
      if (Platform.OS === "ios") {
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
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View style={[input.content, { bottom: keyboardPositon }]}>
      {/* <SendMedia /> */}
      <View style={input.inputContainer}>
        <Input
          style={input.input}
          placeholder="Enviar mensaje"
          variant="unstyled"
          onChange={(text) => formik.setFieldValue("message", text)}
          onEndEditing={!formik.isSubmitting && formik.handleSubmit}
        />
        <IconButton
          icon={<Icon as={MaterialCommunityIcons} name="send" />}
          padding={0}
          style={input.send}
          onPress={!formik.isSubmitting && formik.handleSubmit}
        />
      </View>
    </View>
  );
};
