import { model, Schema } from "mongoose";

const chatMessageSchema = Schema(
  {
    chat: {
      type: Schema.Types.ObjectId,
      ref: "Chat",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    message: String,
    type: {
      type: String,
      enum: ["TEXT", "IMAGE"],
    },
  },
  {
    timestamps: true,
  }
);

export const ChatMessage = model("ChatMessage", chatMessageSchema);
