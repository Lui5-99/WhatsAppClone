import { Group, User } from "../models/index.js";
import { getFilePath } from "../utils/index.js";

const create = async (req, res) => {
  try {
    const { user_id } = req.user;
    const group = new Group(req.body);
    group.creator = user_id;
    group.participants = JSON.parse(req.body.participants);
    group.participants = [...group.participants, user_id];
    if (req.files.image) {
      const imagePath = getFilePath(req.files.image);
      group.image = imagePath;
    }
    const response = await group.save();
    return res.status(200).send(response);
  } catch (error) {
    return res.status(500).send({ msg: error.message });
  }
};

const getAll = async (req, res) => {
  try {
    const { user_id } = req.user;
    const groups = await Group.find({ participants: user_id })
      .populate("creator")
      .populate("participants");
    return res.status(200).send(groups);
  } catch (error) {
    return res.status(500).send({ msg: error.message });
  }
};
const getGroup = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await Group.findById(id).populate("participants");
    if (!response) return res.status(404).send({ msg: "Grupo no encontrado" });
    return res.status(200).send(response);
  } catch (error) {
    return res.status(500).send({ msg: error.message });
  }
};

const updateGroup = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const group = await Group.findById(id);
    if (name) group.name = name;
    if (req.files.image) {
      const imagePath = getFilePath(req.files.image);
      group.image = imagePath;
    }

    const response = await Group.findByIdAndUpdate(id, group);

    return res.status(200).send({ image: group.image, name });
  } catch (error) {
    return res.status(500).send({ msg: error.message });
  }
};

const exitGroup = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id } = req.user;
    const group = await Group.findById(id);

    const newParticipants = group.participants.filter(
      (participant) => participant.id.toString() !== user_id
    );
    const newData = {
      ...group._doc,
      participants: newParticipants,
    };
    const response = await Group.findByIdAndUpdate(id, newData);
    return res.status(200).send({ msg: "Salida exitosa", data: response });
  } catch (error) {
    return res.status(500).send({ msg: error.message });
  }
};

const addParticipant = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id } = req.body;
    const group = await Group.findById(id);

    const users = await User.find({ _id: user_id });

    if (!users) return res.status(404).send({ msg: "Usuarios no encontrados" });

    const arrayUsers = [];
    users.forEach((user) => {
      arrayUsers.push(user._id);
    });

    const newData = {
      ...group._doc,
      participants: [...group.participants, ...arrayUsers],
    };
    const response = await Group.findByIdAndUpdate(id, newData);
    return res.status(200).send(response);
  } catch (error) {
    return res.status(500).send({ msg: error.message });
  }
};

const banParticipantGroup = async (req, res) => {
  try {
    const { group_id, user_id } = req.body;
    const group = await Group.findById(group_id);
    const newParticipants = group.participants.filter(
      (participant) => participant.id.toString() !== user_id
    );
    const newData = {
      ...group._doc,
      participants: newParticipants,
    };
    const response = await Group.findByIdAndUpdate(group_id, newData);
    return res.status(200).send(response);
  } catch (error) {
    return res.status(500).send({ msg: error.msg });
  }
};

export const GroupController = {
  create,
  getAll,
  getGroup,
  updateGroup,
  exitGroup,
  addParticipant,
  banParticipantGroup,
};
