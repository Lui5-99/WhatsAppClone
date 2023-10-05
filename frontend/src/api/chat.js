import { ENV } from "../utils";

export class Chat {
  async create(accessToken, participantIdOne, participantIdTwo) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.CHAT}`;
      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          participant_one: participantIdOne,
          participant_two: participantIdTwo,
        }),
      };
      const response = await fetch(url, params);
      const result = await response.json();
      if (response.status !== 200 && response.status !== 201) throw result;
      return result;
    } catch (error) {
      throw error;
    }
  }
  async getAll(accessToken) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.CHAT}`;
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
  async remove(accessToken, chat_id) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.CHAT}/${chat_id}`;
      const params = {
        method: "DELETE",
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
  async obtain(accessToken, chat_id) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.CHAT}/${chat_id}`;
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
