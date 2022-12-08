"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const api_1 = __importDefault(require("./api"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ limit: "1gb", extended: false }));
app.get("/", (req, res) => {
    res.send("SubwayTour Server");
});
app.use("/api", api_1.default);
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`[server]:  🚀 Server is running at https://localhost:${port}`);
});
const DB_URI = process.env.DB_URI;
mongoose_1.default.connect(DB_URI, (err) => {
    if (err) {
        console.error(err);
    }
    else {
        console.log("DB Connected");
    }
});
