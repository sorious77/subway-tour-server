import { Schema, model } from "mongoose";

interface StationInfo {
  name: string;
  code: number;
  lat: number;
  lng: number;
}

const stationSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: Number,
    required: true,
  },
  lat: {
    type: Number,
    required: true,
  },
  lng: {
    type: Number,
    required: true,
  },
});

const Station = model("Station", stationSchema);

export { Station, StationInfo };
