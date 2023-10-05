import AsyncStorage from "@react-native-async-storage/async-storage";

export class UnreadMessages {
  async setTotalReadMessages(chat_id, total) {
    await AsyncStorage.setItem(`${chat_id}_read`, total.toString());
  }
  async getTotalReadMessages(chat_id) {
    const response = await AsyncStorage.getItem(`${chat_id}_read`);
    return Number(response);
  }
}
