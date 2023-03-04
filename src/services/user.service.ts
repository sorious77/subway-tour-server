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

  private static generateNickname() {
    const prefixs = ["똑똑", "깔끔", "딩굴", "꼬질"];
    const postfixs = ["레오", "구스", "메라"];

    const randomNumber = Math.floor(Math.random() * 1000);

    let number =
      randomNumber < 10
        ? `00${randomNumber}`
        : randomNumber < 100
        ? `0${randomNumber}`
        : `${randomNumber}`;

    const prefix = prefixs[Math.floor(Math.random() * prefixs.length)];
    const postfix = postfixs[Math.floor(Math.random() * postfixs.length)];

    return `${prefix}${postfix}${number}`;
  }

  public static async register({ email, password }: UserInfo) {
    const nickname = UserService.generateNickname();

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
