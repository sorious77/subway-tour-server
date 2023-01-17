import { Request, Response, Router } from "express";
import { PostInfo } from "../models/post.model";
import { PostService } from "../services/post.service";

const router = Router();

router.get("/:page", async (req: Request, res: Response) => {
  const page = +req.params.page;

  const result = await PostService.getPostsByPage(page);

  res.status(200).json(result);
});

export default router;
