import { Heading, Spinner, VStack } from "native-base";
import { View, Platform } from "react-native";
import { styles } from "./styles";

export const LoadingScreen = () => {
  return Platform.OS === "ios" ? (
    <VStack flex alignItems="center" justifyContent="center">
      <Spinner size="lg" />
      <Heading color="primary.500" fontSize="md" marginTop={2}>
        Cargando
      </Heading>
    </VStack>
  ) : (
    <View style={styles.content}>
      <Spinner size="lg" />
      <Heading color="primary.500" fontSize="md" marginTop={2}>
        Cargando
      </Heading>
    </View>
  );
};
