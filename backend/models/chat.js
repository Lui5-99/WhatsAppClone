import { Schema, model } from "mongoose";

const chatSchema = Schema({
  participant_one: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  participant_two: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Chat = model("Chat", chatSchema);
