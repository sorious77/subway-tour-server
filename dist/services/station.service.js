"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StationService = void 0;
const station_model_1 = require("../models/station.model");
const init_json_1 = __importDefault(require("./init.json"));
class StationService {
    static async init() {
        const addVisited = init_json_1.default.map((station) => {
            return { ...station, visited: false };
        });
        try {
            await station_model_1.Station.deleteMany({});
            await station_model_1.Station.insertMany(addVisited);
            return true;
        }
        catch (error) {
            throw error;
        }
    }
    static async getRandomStation() {
        try {
            const result = await station_model_1.Station.find({
                visited: false,
            }, {
                station_nm: 1,
                station_nm_eng: 1,
                _id: 0,
            });
            return result;
        }
        catch (error) {
            console.log(error);
            return [];
        }
    }
    static async getAllStation() {
        try {
            const result = await station_model_1.Station.find({}, {
                station_nm: 1,
                station_nm_eng: 1,
                _id: 0,
            });
            return result;
        }
        catch (error) {
            console.log(error);
            return [];
        }
    }
}
exports.StationService = StationService;
