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

  if (result) res.status(200).json(result);
  else res.status(404).json({ success: false });
});

router.get("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const result = await PostService.getPostById(+id);

    res.status(200).json(result);
  } catch (e) {
    res.status(404).json({ error: "게시글 조회에 실패했습니다." });
  }
});

export default router;
