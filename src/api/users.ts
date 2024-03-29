import { Request, Response, Router } from "express";
import { UserService } from "../services/user.service";

const router = Router();

router.post("/login", async (req: Request, res: Response) => {
  const {
    body: { email, password },
  } = req;

  const result = await UserService.login({ email, password });

  res.status(200).json(result);
});

router.post("/register", async (req: Request, res: Response) => {
  const {
    body: { email, nickname, password },
  } = req;

  const result = await UserService.register({ email, nickname, password });

  if (result.success) {
    res.status(200).json({ ...result });
  } else {
    res.status(404).json({ ...result });
  }
});

router.patch("/update", async (req: Request, res: Response) => {
  const {
    body: { email, nickname, password, newPassword },
  } = req;

  const result = await UserService.update({
    email,
    nickname,
    password,
    newPassword,
  });

  if (result)
    res.status(200).json({ success: "회원 정보 수정에 성공했습니다." });
  else res.status(404).json({ error: "회원 정보 수정에 실패했습니다." });
});

router.get("/lists", async (req: Request, res: Response) => {
  const result = await UserService.findUsers();

  res.status(200).json(result);
});

export default router;
