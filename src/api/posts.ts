import { Request, Response, Router } from "express";
import { PostInfo } from "../models/post.model";
import { PostService } from "../services/post.service";

const router = Router();

router.post("/write", async (req: Request, res: Response) => {
  const {
    body: { title, station_nm, visitedAt, content, author },
  } = req;

  const newPost: PostInfo = {
    title,
    station_nm,
    visitedAt,
    content,
    author,
  };

  const result = await PostService.writePost(newPost);

  if (result) res.status(200).json({ success: "글 작성에 성공했습니다." });
  else res.status(404).json({ error: "글 작성에 실패했습니다." });
});

router.get("/:page", async (req: Request, res: Response) => {
  const page = +req.params.page;

  const result = await PostService.getPostsByPage(page);

  res.status(200).json(result);
});

export default router;
