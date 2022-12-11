import { Router } from "express";
import users from "./users";
import stations from "./stations";
import posts from "./posts";

const router = Router();

router.use("/users", users);
router.use("/stations", stations);
router.use("/posts", posts);

export default router;
