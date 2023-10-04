import { View, Text } from "react-native";
import { Input, Button } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { useFormik } from "formik";
import { Auth } from "../../api";
import { initialValues, validationSchema } from "./LoginForm.Form";
import { stylesFormLogin } from "./styles";
import { useAuth } from "../../hooks";

const authController = new Auth();

export const LoginForm = () => {
  const { login } = useAuth();
  const navigation = useNavigation();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: (values) => handleLogin(values),
  });

  const handleLogin = async (data) => {
    try {
      const response = await authController.login(data.email, data.password);
      const { access, refresh } = response;
      await authController.setAccessToken(access);
      await authController.setRefreshToken(refresh);
      await login(access);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <View style={stylesFormLogin.viewInput}>
        <Input
          placeholder="Correo electronico"
          style={[
            stylesFormLogin.input,
            formik.errors.password && stylesFormLogin.inputError,
          ]}
          variant="unstyled"
          value={formik.values.email}
          onChangeText={(text) => formik.setFieldValue("email", text)}
        />
      </View>
      <View style={stylesFormLogin.viewInput}>
        <Input
          placeholder="Contraseña"
          style={[
            stylesFormLogin.input,
            formik.errors.password && stylesFormLogin.inputError,
          ]}
          variant="unstyled"
          secureTextEntry={true}
          value={formik.values.password}
          onChangeText={(text) => formik.setFieldValue("password", text)}
        />
      </View>
      <Button
        style={stylesFormLogin.Button}
        onPress={formik.handleSubmit}
        isLoading={formik.isSubmitting}
      >
        INGRESAR
      </Button>
    </View>
  );
};
