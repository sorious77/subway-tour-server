import { Station, StationInfo } from "../models/station.model";
import initInfo from "./init.json";

export class StationService {
  public static async init() {
    const addVisited = initInfo.map((station) => {
      return { ...station, visited: false };
    });

    try {
      await Station.deleteMany({});
      await Station.insertMany(addVisited);

      return true;
    } catch (error) {
      throw error;
    }
  }

  public static async getRandomStation() {
    try {
      const result = await Station.find(
        {
          visited: false,
        },
        {
          station_nm: 1,
          station_nm_eng: 1,
          _id: 0,
        }
      );

      return result;
    } catch (error) {
      console.log(error);

      return [];
    }
  }

  public static async getAllStation() {
    try {
      const result = await Station.find(
        {},
        {
          station_nm: 1,
          station_nm_eng: 1,
          _id: 0,
        }
      );

      return result;
    } catch (error) {
      console.log(error);

      return [];
    }
  }
}
