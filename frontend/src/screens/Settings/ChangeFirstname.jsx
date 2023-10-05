import { useEffect } from "react";
import { View, Text } from "react-native";
import { Input, Button, IconButton, CloseIcon } from "native-base";
import { styles } from "./styles";
import { initialValues, validationSchema } from "./ChangeFirstname.Form";
import { useFormik } from "formik";
import { User } from "../../api";
import { useAuth } from "../../hooks";
import { useNavigation } from "@react-navigation/native";

const userController = new User();

export const ChangeFirstname = () => {
  const navigation = useNavigation();
  const { accessToken, updatedUser } = useAuth();
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: (values) => handleFirstname(values),
  });

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

  const handleFirstname = async (values) => {
    try {
      const dataUser = { firstname: values.firstname };
      await userController.updateUser(accessToken, dataUser);
      updatedUser("firstname", values.firstname);
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.content}>
      <Input
        placeholder="Nombre"
        style={[styles.input, formik.errors.password && styles.inputError]}
        variant="unstyled"
        autoFocus
        value={formik.values.firstname}
        onChangeText={(text) => formik.setFieldValue("firstname", text)}
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
