import { View, Text } from "react-native";
import { Input, Button } from "native-base";
import { styles } from "./styles";
import { initialValues, validationSchema } from "./ChangeLastname.Form";
import { useFormik } from "formik";
import { User } from "../../api";
import { useAuth } from "../../hooks";
import { useNavigation } from "@react-navigation/native";

const userController = new User();

export const ChangeLastname = () => {
  const navigation = useNavigation();
  const { accessToken, updatedUser } = useAuth();
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: (values) => handleLastname(values),
  });

  const handleLastname = async (values) => {
    try {
      const dataUser = { Lastname: values.lastname };
      await userController.updateUser(accessToken, dataUser);
      updatedUser("lastname", values.lastname);
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View style={styles.content}>
      <Input
        placeholder="Apellidos"
        style={[styles.input, formik.errors.password && styles.inputError]}
        variant="unstyled"
        autoFocus
        value={formik.values.lastname}
        onChangeText={(text) => formik.setFieldValue("lastname", text)}
      />
      <Button
        style={styles.btn}
        onPress={formik.handleSubmit}
        isLoading={formik.isSubmitting}
      >
        Cambiar
      </Button>
    </View>
  );
};
