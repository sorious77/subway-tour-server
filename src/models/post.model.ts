import { Schema } from "mongoose";

interface PostInfo {
  title: string;
  createdAt?: Date;
  station_nm: string;
  visitedAt: string;
  content: string;
  author?: string;
  updatedAt?: Date;
}

const postSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
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
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

export { PostInfo, postSchema };
