import AsyncStorage from "@react-native-async-storage/async-storage";

export class UnreadMessages {
  async getTotalReadMessages(chat_id) {
    const response = await AsyncStorage.getItem(`${chat_id}_read`);
    return Number(response);
  }
}
