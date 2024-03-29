import { Router } from "express";
import users from "./users";
import stations from "./stations";
import posts from "./posts";
import lists from "./lists";

import multer from "multer";

const router = Router();

router.use("/users", users);
router.use("/stations", stations);
router.use("/posts", posts);
router.use("/lists", lists);

const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 20 * 1024 * 1024 },
});

router.post("/thumbnail", upload.any(), async (req, res) => {
  console.log("Received image:", req.file);

  res.json({ message: "Image uploaded successfully" });
});

router.get("/test", (req, res) => {
  console.log("testtest");

  res.json({ message: "test" });
});

export default router;
