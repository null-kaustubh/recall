import mongoose, { Schema } from "mongoose";

const User = new Schema({
  username: { type: String, unique: true },
  password: String,
});

export const UserModel = mongoose.model("users", User);

const Content = new Schema({
  title: String,
  link: String,
  note: String,
  tags: [String],
  userId: { type: mongoose.Types.ObjectId, ref: "users", required: true },
});

export const ContentModel = mongoose.model("contents", Content);

const Link = new Schema({
  hash: { type: String, required: true },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});

export const LinkModel = mongoose.model("links", Link);
