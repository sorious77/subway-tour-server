"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const station_service_1 = require("../services/station.service");
const router = (0, express_1.Router)();
router.put("/init", async (req, res) => {
    try {
        const result = await station_service_1.StationService.init();
        res.status(200).json(result);
    }
    catch (e) {
        console.log(e);
        res.status(200).json({ error: "초기화에 실패했습니다." });
    }
});
router.get("/gacha", async (req, res) => {
    const result = await station_service_1.StationService.getRandomStation();
    res.status(200).json(result);
});
router.get("/", async (req, res) => {
    const result = await station_service_1.StationService.getAllStation();
    res.status(200).json(result);
});
exports.default = router;
