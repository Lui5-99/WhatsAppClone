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
  async getAll(accessToken, chat_id) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.CHAT_MESSAGES}/${chat_id}`;
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
  async sendText(accessToken, chat_id, message) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.CHAT_MESSAGES}`;
      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          chat_id,
          message,
        }),
      };
      const response = await fetch(url, params);
      const result = await response.json();
      if (response.status !== 201) throw result;
      return result;
    } catch (error) {
      throw error;
    }
  }
  async sendImage(accessToken, chat_id, file) {
    try {
      const formData = new FormData();
      formData.append("chat_id", chat_id);
      formData.append("image", file);
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.CHAT_MESSAGES_IMAGE}`;
      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      };
      const response = await fetch(url, params);
      const result = await response.json();
      if (response.status !== 201) throw result;
      return result;
    } catch (error) {
      throw error;
    }
  }
}
