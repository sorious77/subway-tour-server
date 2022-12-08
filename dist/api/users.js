"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_service_1 = require("../services/user.service");
const router = (0, express_1.Router)();
router.post("/login", async (req, res) => {
    const { body: { email, password }, } = req;
    // TODO Decryption
    const result = await user_service_1.UserService.login({ email, password });
    res.status(200).json(result);
});
router.post("/register", async (req, res) => {
    const { body: { email, name, password }, } = req;
    // TODO Encryption
    const result = await user_service_1.UserService.insertUser({ email, name, password });
    if (result) {
        res.status(200).json({ success: "회원가입에 성공했습니다." });
    }
    else {
        res.status(200).json({ error: "회원가입에 실패했습니다." });
    }
});
router.get("/lists", async (req, res) => {
    const result = await user_service_1.UserService.findUsers();
    res.status(200).json(result);
});
exports.default = router;
