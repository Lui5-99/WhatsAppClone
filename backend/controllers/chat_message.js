import { ChatMessage } from "../models/index.js";
import { io, getFilePath } from "../utils/index.js";

const send = async (req, res) => {
  try {
    const { chat_id, message } = req.body;
    const { user_id } = req.user;
    const chat_message = new ChatMessage({
      chat: chat_id,
      user: user_id,
      message: message,
      type: "TEXT",
    });
    const response = await chat_message.save();
    const result = await response.populate("user", "-password");
    io.sockets.in(chat_id).emit("message", result);
    io.sockets.in(`${chat_id}_notify`).emit("message_notify", result);
    return res.status(201).send(result);
  } catch (error) {
    return res.status(500).send({ msg: error.message });
  }
};

const sendImage = async (req, res) => {
  try {
    const { chat_id } = req.body;
    const { user_id } = req.user;
    const chat_message = new ChatMessage({
      chat: chat_id,
      user: user_id,
      message: getFilePath(req.files.image),
      type: "IMAGE",
    });
    const response = await chat_message.save();
    const result = await response.populate("user");
    io.sockets.in(chat_id).emit("message", result);
    io.sockets.in(`${chat_id}_notify`).emit("message_notify", result);
    return res.status(201).send(result);
  } catch (error) {
    return res.status(500).send({ msg: error.message });
  }
};

const getAllMessages = async (req, res) => {
  try {
    const { chat_id } = req.params;
    const messages = await ChatMessage.find({ chat: chat_id })
      .sort({ createdAt: 1 })
      .populate("user");
    const total = await ChatMessage.find({ chat: chat_id }).count();
    return res.status(200).send({ messages, total });
  } catch (error) {
    return res.status(500).send({ msg: error.message });
  }
};

const getTotalMessages = async (req, res) => {
  try {
    const { chat_id } = req.params;
    const response = await ChatMessage.find({ chat: chat_id }).count();
    return res.status(200).send(JSON.stringify(response));
  } catch (error) {
    return res.status(500).send({ msg: error.message });
  }
};

const getLatestMessage = async (req, res) => {
  try {
    const { chat_id } = req.params;
    const response = await ChatMessage.findOne({ chat: chat_id }).sort({
      createdAt: -1,
    });
    return res.status(200).send(response || {});
  } catch (error) {
    return res.status(500).send({ msg: error.message });
  }
};

export const ChatMessageController = {
  send,
  sendImage,
  getAllMessages,
  getTotalMessages,
  getLatestMessage,
};
