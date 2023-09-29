import { User } from "../models/index.js";
import { getFilePath } from "../utils/image.js";

const getMe = async (req, res) => {
  try {
    const { user_id } = req.user;
    const response = await User.findById(user_id).select("-password");
    if (!response)
      return res.status(404).send({ msg: "No se encontro al usuario" });
    return res.status(200).send(response);
  } catch (error) {
    return res.status(500).send({ msg: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const { user_id } = req.user;
    const response = await User.find({ _id: { $ne: user_id } }).select([
      "-password",
    ]);
    if (!response)
      return res.status(404).send({ msg: "No se encontraron usuarios" });
    return res.status(200).send(response);
  } catch (error) {
    return res.status(500).send({ msg: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await User.findById(id).select("-password");
    if (!response)
      return res.status(404).send({ msg: "No se encontro al usuario" });
    return res.status(200).send(response);
  } catch (error) {
    return res.status(500).send({ msg: error.message });
  }
};

const updatedUser = async (req, res) => {
  try {
    const { user_id } = req.user;
    const user = req.body;
    if (req.files.avatar) {
      const imgPath = getFilePath(req.files.avatar);
      user.avatar = imgPath;
    }
    const response = await User.findByIdAndUpdate({ _id: user_id }, user);
    if (!response)
      return res.status(404).send({ msg: "No se pudo actualizar el usuario" });
    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).send({ msg: error.message });
  }
};

export const UserController = { getMe, getUsers, getUser, updatedUser };
