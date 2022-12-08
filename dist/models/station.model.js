"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Station = void 0;
const mongoose_1 = require("mongoose");
const stationSchema = new mongoose_1.Schema({
    station_nm: {
        type: String,
        required: true,
    },
    station_nm_eng: {
        type: String,
        required: true,
    },
    visited: {
        type: Boolean,
        required: true,
    },
});
const Station = (0, mongoose_1.model)("Station", stationSchema);
exports.Station = Station;
