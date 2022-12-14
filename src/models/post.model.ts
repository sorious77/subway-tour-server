import { Schema, model } from "mongoose";

interface PostInfo {
  title: string;
  createdAt?: Date;
  station_nm: string;
  visitedAt: string;
  content: string;
  author: string;
}

const postSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  station_nm: {
    type: String,
    require: true,
  },
  visitedAt: {
    type: Date,
    require: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
});

const Post = model("Post", postSchema);

export { Post, PostInfo };
