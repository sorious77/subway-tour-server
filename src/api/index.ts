import { Router } from "express";
import users from "./users";
import stations from "./stations";
import posts from "./posts";
import lists from "./lists";

const router = Router();

router.use("/users", users);
router.use("/stations", stations);
router.use("/posts", posts);
router.use("/lists", lists);

export default router;
