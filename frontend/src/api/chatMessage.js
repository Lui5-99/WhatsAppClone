import { ENV } from "../utils";

export class ChatMessage {
  async getLastMessage(accessToken, chat_id) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.CHAT_MESSAGE_LAST}/${chat_id}`;
      const params = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const response = await fetch(url, params);
      const result = await response.json();
      if (response.status !== 200) throw result;
      return result;
    } catch (error) {
      throw error;
    }
  }
  async getTotal(accessToken, chat_id) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.CHAT_TOTAL}/${chat_id}`;
      const params = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const response = await fetch(url, params);
      const result = await response.json();
      if (response.status !== 200) throw result;
      return result;
    } catch (error) {
      throw error;
    }
  }
}
