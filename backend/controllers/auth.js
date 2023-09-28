import { User } from "../models/index.js";
import bcrypt from "bcryptjs";
import { jwt } from "../utils/index.js";

// Register
const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    const user = new User({
      email: email.toLowerCase(),
      password: hashPassword,
    });
    const result = await user.save();
    return res.status(201).send(result);
  } catch (error) {
    return res.status(400).send({ msg: error.message });
  }
};

// Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const emailLower = email.toLowerCase();
    const userFound = await User.findOne({ email: emailLower });
    const isPassword = await bcrypt.compare(password, userFound.password);
    if (!isPassword)
      return res.status(400).send({ msg: "Contraseña incorrecta" });
    return res.status(200).send({
      access: jwt.createAccessToken(userFound),
      refresh: jwt.createRefreshToken(userFound),
    });
  } catch (error) {
    return res.status(500).send({ msg: error.message });
  }
};

// Refresh Token
const refreshAccessToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken)
      return res.status(400).send({ msg: "Se requiere el token" });
    const hasExpired = jwt.hasExpiredToken(refreshToken);
    if (hasExpired) return res.status(400).send({ msg: "Token expirado" });

    const { user_id } = jwt.decoded(refreshToken);

    const userFound = await User.findById(user_id);

    return res
      .status(200)
      .send({ accessToken: jwt.createAccessToken(userFound) });
  } catch (error) {
    return res.status(500).send({ msg: error.message });
  }
};

export const AuthController = {
  register,
  login,
  refreshAccessToken,
};
