"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const user_model_1 = require("../models/user.model");
class UserService {
    static async login({ email, password }) {
        console.log(email);
        try {
            const result = await user_model_1.User.findOne({
                email,
                password,
            }, { email: 1, name: 1, _id: 0 });
            return result;
        }
        catch (e) {
            console.log(e);
            return {};
        }
    }
    static async insertUser({ email, name, password }) {
        const NewUser = new user_model_1.User({
            email,
            name,
            password,
        });
        try {
            await NewUser.save();
            return true;
        }
        catch (e) {
            console.log(e);
            return false;
        }
    }
    static async findUsers() {
        try {
            const result = await user_model_1.User.find({});
            console.log(result);
            return result;
        }
        catch (e) {
            console.error(e);
            return false;
        }
    }
}
exports.UserService = UserService;
