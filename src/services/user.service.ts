import { User, UserInfo, UserUpdateInfo } from "../models/user.model";
import bcrypt from "bcrypt";

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
        },
        { email: 1, nickname: 1, password: 1, _id: 0 }
      );

      if (!user) {
        return {};
      }

      const isCorrectpassword = await bcrypt.compare(password, user.password);

      if (isCorrectpassword) {
        return {
          email: user.email,
          nickname: user.nickname,
        };
      }

      return {};
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

  private static async encryptPassword(password: string) {
    const saltRound = (process.env.SALT_ROUND && +process.env.SALT_ROUND) || 10;
    const salt = await bcrypt.genSalt(saltRound);

    return await bcrypt.hash(password, salt);
  }

  public static async register({ email, password }: UserInfo) {
    const isExistEmail = await this.findUserByEmail(email);
    if (isExistEmail) {
      return { error: true, message: "이미 존재하는 이메일입니다" };
    }

    const nickname = UserService.generateNickname();
    const hashedPassword = await this.encryptPassword(password);

    const newUser = new User({
      email,
      nickname,
      password: hashedPassword,
    });

    try {
      await newUser.save();

      return { success: true };
    } catch (e) {
      console.log(e);
      return { error: true, message: "회원 가입에 실패했습니다" };
    }
  }

  public static async update({
    email,
    nickname,
    password,
    newPassword,
  }: UserUpdateInfo) {
    try {
      const user = await User.findOne({ email, password });

      if (!user) {
        return false;
      }

      const updateInfo = {
        ...(nickname && { nickname }),
        ...(newPassword && { newPassword }),
      };

      if (Object.keys(updateInfo).length === 0) {
        return false;
      }

      await User.findOneAndUpdate({ email }, { ...updateInfo });

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
