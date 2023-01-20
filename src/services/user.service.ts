import { User, UserInfo } from "../models/user.model";

export class UserService {
  public static async findUserByEmail(email: string) {
    try {
      const user = await User.findOne({
        email,
      });

      return user;
    } catch (e) {
      return null;
    }
  }

  public static async login({ email, password }: UserInfo) {
    try {
      const user = await User.findOne(
        {
          email,
          password,
        },
        { email: 1, nickname: 1, _id: 0 }
      );

      return user;
    } catch (e) {
      return {};
    }
  }

  public static async register({ email, nickname, password }: UserInfo) {
    const newUser = new User({
      email,
      nickname,
      password,
    });

    try {
      await newUser.save();

      return true;
    } catch (e) {
      return false;
    }
  }

  public static async update({ email, nickname, password }: UserInfo) {
    try {
      const user = await User.findOne({ email, password });

      if (!user) {
        return false;
      }

      await User.findOneAndUpdate({ email }, { nickname, password });

      return true;
    } catch (e) {
      return false;
    }
  }

  public static async findUsers() {
    try {
      const result = await User.find({});

      return result;
    } catch (e) {
      return false;
    }
  }
}
