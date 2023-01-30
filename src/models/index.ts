import mongoose, { model } from "mongoose";
import autoIncrement from "mongoose-auto-increment";
import { postSchema } from "./post.model";

const DB_URI =
  process.env.DB_URI ||
  "mongodb://localhost:27017/?retryWrites=true&w=majority";

const DB_NAME = process.env.DB_NAME || "subwaytour";

mongoose.connect(DB_URI!, {
  dbName: DB_NAME,
});

const connect = mongoose.connection;

autoIncrement.initialize(connect);

postSchema.plugin(autoIncrement.plugin, {
  model: "Post",
  field: "id",
  startAt: 1,
  increment: 1,
});

export const Post = model("Post", postSchema);
