import mongoose, { Schema } from "mongoose";

const User = new Schema({
  username: { type: String, unique: true },
  password: String,
});

export const UserModel = mongoose.model("users", User);

const Content = new Schema({
  title: String,
  link: String,
  tags: [{ type: mongoose.Types.ObjectId, ref: "tags" }],
  userId: { type: mongoose.Types.ObjectId, ref: "users", required: true },
});

export const ContentModel = mongoose.model("contents", Content);
