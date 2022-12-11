import { Schema, model } from "mongoose";

interface UserInfo {
  email: string;
  password: string;
  name?: string;
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
  name: {
    type: String,
    required: true,
  },
});

const User = model("User", userSchema);

export { User, UserInfo };
