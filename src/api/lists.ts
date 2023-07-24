import { Request, Response, Router } from "express";
import { PostInfo } from "../models/post.model";
import { PostService } from "../services/post.service";

const router = Router();

router.get("/myDiary", async (req: Request, res: Response) => {
  const { page, email } = req.query as { page: string; email: string };

  try {
    if (!page || !email) throw new Error("page와 email은 필수입니다.");

    const result = await PostService.getPostByPageAndEmail({
      page: +page,
      email,
    });

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: "게시글 조회에 실패했습니다." });
  }
});

router.get("/:page", async (req: Request, res: Response) => {
  const page = +req.params.page;

  try {
    const result = await PostService.getPostsByPage(page);

    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ error: "게시글 조회에 실패했습니다." });
  }
});

export default router;
