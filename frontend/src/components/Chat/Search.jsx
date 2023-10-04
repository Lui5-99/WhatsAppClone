import { View } from "react-native";
import { Input } from "native-base";
import { createFilter } from "react-search-input";
import { stylesSearch } from "./styles";

const KEYS_TO_FILTER = ["email", "firstname", "lastname"];

export const Search = ({ data, setData }) => {
  const onSearch = (text) => {
    const result = data.filter(createFilter(text, KEYS_TO_FILTER));
    setData(result);
  };

  return (
    <View style={stylesSearch.content}>
      <Input
        placeholder="Buscar"
        variant="unstyled"
        style={stylesSearch.input}
        onChangeText={onSearch}
      />
    </View>
  );
};
