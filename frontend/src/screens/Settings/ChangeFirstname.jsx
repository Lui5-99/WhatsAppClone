import { View, Text } from "react-native";
import { Input, Button } from "native-base";
import { styles } from "./styles";

export const ChangeFirstname = () => {
  return (
    <View style={styles.content}>
      <Input
        placeholder="Nombre"
        style={[styles.input]}
        variant="unstyled"
        autoFocus
      />
      <Button style={styles.btn}>Cambiar</Button>
    </View>
  );
};
