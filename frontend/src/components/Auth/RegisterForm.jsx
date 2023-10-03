import { View, Text } from "react-native";
import { Input, Button } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { useFormik } from "formik";
import { Auth } from "../../api";
import { initialValues, validationSchema } from "./RegisterForm.Form";
import { stylesFormRegister } from "./styles";

const authController = new Auth();

export const RegisterForm = () => {
  const navigation = useNavigation();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: (values) => handleRegister(values),
  });

  const handleRegister = async (data) => {
    try {
      await authController.register(data.email, data.password);
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <View style={stylesFormRegister.viewInput}>
        <Input
          placeholder="Correo electronico"
          style={[
            stylesFormRegister.input,
            formik.errors.email && stylesFormRegister.inputError,
          ]}
          variant="unstyled"
          autoCapitalize={false}
          value={formik.values.email}
          onChangeText={(text) => formik.setFieldValue("email", text)}
        />
      </View>
      <View style={stylesFormRegister.viewInput}>
        <Input
          placeholder="Contraseña"
          style={[
            stylesFormRegister.input,
            formik.errors.password && stylesFormRegister.inputError,
          ]}
          variant="unstyled"
          secureTextEntry={true}
          value={formik.values.password}
          onChangeText={(text) => formik.setFieldValue("password", text)}
        />
      </View>
      <Button
        style={stylesFormRegister.Button}
        onPress={formik.handleSubmit}
        isLoading={formik.isSubmitting}
      >
        CREAR CUENTA
      </Button>
    </View>
  );
};
