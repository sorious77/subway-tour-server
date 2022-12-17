import { User, UserInfo } from "../models/user.model";

export class UserService {
  public static async login({ email, password }: UserInfo) {
    try {
      const result = await User.findOne(
        {
          email,
          password,
        },
        { email: 1, nickname: 1, _id: 0 }
      );

      return result;
    } catch (e) {
      return {};
    }
  }

  public static async insertUser({ email, nickname, password }: UserInfo) {
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

  public static async findUsers() {
    try {
      const result = await User.find({});

      return result;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
}
