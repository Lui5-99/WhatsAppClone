import { Schema, model } from "mongoose";

const GroupSchema = Schema({
  name: String,
  image: String,
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  participants: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

export const Group = model("Group", GroupSchema);
