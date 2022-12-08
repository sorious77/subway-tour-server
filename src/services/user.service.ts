import { User, UserInfo } from "../models/user.model";

export class UserService {
  public static async login({ email, password }: UserInfo) {
    console.log(email);

    try {
      const result = await User.findOne(
        {
          email,
          password,
        },
        { email: 1, name: 1, _id: 0 }
      );

      return result;
    } catch (e) {
      console.log(e);

      return {};
    }
  }

  public static async insertUser({ email, name, password }: UserInfo) {
    const NewUser = new User({
      email,
      name,
      password,
    });

    try {
      await NewUser.save();

      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  public static async findUsers() {
    try {
      const result = await User.find({});

      console.log(result);
      return result;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
}
