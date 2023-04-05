import { Schema, model } from "mongoose";

interface UserInfo {
  email: string;
  password: string;
  nickname?: string;
}

interface UserUpdateInfo {
  email: string;
  password: string;
  nickname: string;
  newPassword?: string;
}

const userSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  nickname: {
    type: String,
    required: true,
  },
});

const User = model("User", userSchema);

export { User, UserInfo, UserUpdateInfo };
