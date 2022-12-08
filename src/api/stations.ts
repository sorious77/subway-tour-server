import { Request, Response, Router } from "express";
import { StationService } from "../services/station.service";

const router = Router();

router.put("/init", async (req: Request, res: Response) => {
  try {
    const result = await StationService.init();

    res.status(200).json(result);
  } catch (e) {
    console.log(e);
    res.status(200).json({ error: "초기화에 실패했습니다." });
  }
});

router.get("/gacha", async (req: Request, res: Response) => {
  const result = await StationService.getRandomStation();

  res.status(200).json(result);
});

router.get("/", async (req: Request, res: Response) => {
  const result = await StationService.getAllStation();

  res.status(200).json(result);
});

export default router;
