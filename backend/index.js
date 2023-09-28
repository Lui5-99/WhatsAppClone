import mongoose from "mongoose";
import { server } from "./app.js";
import { DB_HOST, DB_PASSWORD, DB_USER, IP_SERVER, PORT } from "./constants.js";
import { io } from "./utils/index.js";

const mongoUri = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/`;
mongoose
  .connect(mongoUri)
  .then(() => {
    server.listen(PORT, () => {
      console.log("######################");
      console.log("###### API REST ######");
      console.log("######################");
      console.log(`http://${IP_SERVER}:${PORT}/api`);

      io.sockets.on("connection", (socket) => {
        console.log("Usuario conectado");

        socket.on("disconnect", () => {
          console.log("Usuario desconectado");
        });

        socket.on("subscribe", (room) => {
          socket.join(room);
        });

        socket.on("unsubscribe", (room) => {
          socket.leave(room);
        });
      });
    });
  })
  .catch((error) => console.log(error));
