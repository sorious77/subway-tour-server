"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = __importDefault(require("./users"));
const stations_1 = __importDefault(require("./stations"));
const router = (0, express_1.Router)();
router.use("/users", users_1.default);
router.use("/stations", stations_1.default);
exports.default = router;
