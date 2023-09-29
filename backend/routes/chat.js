import express from "express";
import { ChatController } from "../controllers/index.js";
import { mdAuth } from "../middleware/index.js";

const api = express.Router();

// Endpoints
api.post("/chat", mdAuth.asureAuth, ChatController.createChat);
api.get("/chat", mdAuth.asureAuth, ChatController.getAllChats);
api.delete("/chat/:id", mdAuth.asureAuth, ChatController.deleteChat);
api.get("/chat/:id", mdAuth.asureAuth, ChatController.getChat);

export const chatRoutes = api;
