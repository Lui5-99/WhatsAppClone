import express from "express";
import multiparty from "connect-multiparty";
import { ChatMessageController } from "../controllers/index.js";
import { mdAuth } from "../middleware/index.js";

const mdupload = multiparty({ uploadDir: "./uploads/images" });

const api = express.Router();

// Endpoint
api.post("/chat/message", mdAuth.asureAuth, ChatMessageController.send);
api.post(
  "/chat/message/image",
  [mdAuth.asureAuth, mdupload],
  ChatMessageController.sendImage
);
api.get(
  "/chat/message/:chat_id",
  mdAuth.asureAuth,
  ChatMessageController.getAllMessages
);
api.get(
  "/chat/message/total/:chat_id",
  mdAuth.asureAuth,
  ChatMessageController.getTotalMessages
);
api.get(
  "/chat/message/last/:chat_id",
  mdAuth.asureAuth,
  ChatMessageController.getLatestMessage
);

export const chatMessage = api;
