import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import api from "./api";
import bodyParser from "body-parser";

dotenv.config();

const app: Express = express();
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: "1gb", extended: false }));

app.get("/", (req: Request, res: Response) => {
  res.send("SubwayTour Server");
});

app.use("/api", api);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`[server]:  🚀 Server is running!`);
});
