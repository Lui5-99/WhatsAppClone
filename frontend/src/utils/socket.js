import io from "socket.io-client";
import { ENV } from "./constants";

export let socket = null;

export const initSocket = () => {
  socket = io(ENV.SOCKET_URL);
};
