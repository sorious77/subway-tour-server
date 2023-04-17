import { Request, Response, Router } from "express";
import { PostInfo } from "../models/post.model";
import { PostService } from "../services/post.service";

const router = Router();

router.get("/:lastPostId", async (req: Request, res: Response) => {
  const lastPostId = +req.params.lastPostId;

  const result = await PostService.getPostsByPage(lastPostId);

  res.status(200).json(result);
});

export default router;
