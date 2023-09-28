import mongoose, { Schema, model } from "mongoose";

const userSChema = Schema({
  email: {
    type: String,
    unique: true,
  },
  firstname: String,
  lastname: String,
  password: String,
  avatar: String,
});

export const User = model("User", userSChema);
