import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import http from "http";
import morgan from "morgan";
import { initSocketServer } from "./utils/index.js";
import {
  authRoutes,
  userRoutes,
  chatRoutes,
  chatMessage,
} from "./routes/index.js";

const app = express();
const server = http.createServer(app);
initSocketServer(server);

// Body Parser
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

// Static folder
app.use(express.static("uploads"));

// Header HTTP - CORS
app.use(cors());

// Logger HTTP request
app.use(morgan("dev"));

// Routing
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", chatRoutes);
app.use("/api", chatMessage);

export { server };
