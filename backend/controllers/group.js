import { Group } from "../models/index.js";
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

export const GroupController = { create, getAll, getGroup };
