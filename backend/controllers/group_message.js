import { GroupMessage } from "../models/index.js";
import { io, getFilePath } from "../utils/index.js";

const sendText = async (req, res) => {
  try {
    const { group_id, message } = req.body;
    const { user_id } = req.user;

    const group_message = new GroupMessage({
      group: group_id,
      user: user_id,
      message,
      type: "TEXT",
    });
    const response = await group_message.save();
    const data = await response.populate("user");
    io.sockets.in(group_id).emit("message", data);
    io.sockets.in(`${group_id}_notify`).emit("message_notify", data);
    return res.status(201).send(data);
  } catch (error) {
    return res.status(500).send({ msg: error.message });
  }
};

const sendImage = async (req, res) => {
  try {
    const { group_id } = req.body;
    const { user_id } = req.user;
    const group_message = new GroupMessage({
      group: group_id,
      user: user_id,
      message: getFilePath(req.files.image),
      type: "IMAGE",
    });
    const response = await group_message.save();
    const result = await response.populate("user");
    io.sockets.in(group_id).emit("message", result);
    io.sockets.in(`${group_id}_notify`).emit("message_notify", result);
    return res.status(201).send(result);
  } catch (error) {
    return res.status(500).send({ msg: error.message });
  }
};

const getAll = async (req, res) => {
  try {
    const { group_id } = req.params;
    const messages = await GroupMessage.find({ group: group_id })
      .sort({ createdAt: 1 })
      .populate("user");
    const total = await GroupMessage.find({ group: group_id }).count();
    return res.status(200).send({ messages, total });
  } catch (error) {
    return res.status(500).send({ msg: error.message });
  }
};

const getTotal = async (req, res) => {
  try {
    const { group_id } = req.params;
    const response = await GroupMessage.find({ group: group_id }).count();
    return res.status(200).send(JSON.stringify(response));
  } catch (error) {
    return res.status(500).send({ msg: error.message });
  }
};

const getLastestMessage = async (req, res) => {
  try {
    const { group_id } = req.params;
    const response = await GroupMessage.findOne({ group: group_id })
      .sort({
        createdAt: -1,
      })
      .populate("user");
    return res.status(200).send(response || {});
  } catch (error) {
    return res.status(500).send({ msg: error.message });
  }
};

export const GroupMessageController = {
  sendText,
  sendImage,
  getAll,
  getTotal,
  getLastestMessage,
};
