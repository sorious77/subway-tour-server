import { Schema, model } from "mongoose";

interface StationInfo {
  station_nm: string;
  station_nm_eng: string;
  visited: boolean;
}

const stationSchema: Schema = new Schema({
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

const Station = model("Station", stationSchema);

export { Station, StationInfo };
