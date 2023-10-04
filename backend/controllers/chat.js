import { Chat, ChatMessage } from "../models/index.js";

const createChat = async (req, res) => {
  try {
    const { participant_one, participant_two } = req.body;

    const foundOne = await Chat.findOne({
      participant_one: participant_one,
      participant_two: participant_two,
    });
    const foundTwo = await Chat.findOne({
      participant_one: participant_two,
      participant_two: participant_one,
    });

    if (foundOne || foundTwo) {
      return res
        .status(200)
        .send({ msg: "Ya tienes un chat con este usuario" });
    }
    const chat = new Chat({
      participant_one: participant_one,
      participant_two: participant_two,
    });
    const response = await chat.save();
    return res.status(201).send(response);
  } catch (error) {
    return res.status(500).send({ msg: error.message });
  }
};

const getAllChats = async (req, res) => {
  try {
    const { user_id } = req.user;
    const chats = await Chat.find({
      $or: [{ participant_one: user_id }, { participant_two: user_id }],
    })
      .populate("participant_one")
      .populate("participant_two");
    const arrayChats = [];
    for await (const chat of chats) {
      const response = await ChatMessage.findOne({ chat: chat._id }).sort({
        createdAt: -1,
      });
      arrayChats.push({
        ...chat._doc,
        last_message_date: response?.createdAt || null,
      });
    }
    return res.status(200).send(arrayChats);
  } catch (error) {
    return res.status(500).send({ msg: error.message });
  }
};

const deleteChat = async (req, res) => {
  try {
    const chat_id = req.params.id;
    const chat = await Chat.findByIdAndDelete(chat_id);
    return res.status(200).send(chat);
  } catch (error) {
    return res.status(500).send({ msg: error.message });
  }
};

const getChat = async (req, res) => {
  try {
    const chat_id = req.params.id;
    const chat = await Chat.findById(chat_id)
      .populate("participant_one")
      .populate("participant_two");
    return res.status(200).send(chat);
  } catch (error) {
    return res.status(500).send({ msg: error.message });
  }
};

export const ChatController = { createChat, getAllChats, deleteChat, getChat };
