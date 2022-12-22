import { Station, StationInfo } from "../models/station.model";
import initInfo from "./init.json";

export class StationService {
  public static async init() {
    try {
      await Station.deleteMany({});
      await Station.insertMany(initInfo);

      return true;
    } catch (error) {
      throw error;
    }
  }

  public static async getRandomStation() {
    try {
      const result = await Station.find(
        {},
        {
          name: 1,
          code: 1,
          lat: 1,
          lng: 1,
          line: 1,
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
          name: 1,
          code: 1,
          lat: 1,
          lng: 1,
          line: 1,
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
