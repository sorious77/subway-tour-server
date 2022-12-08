import { Router } from "express";
import users from "./users";
import stations from "./stations";

const router = Router();

router.use("/users", users);
router.use("/stations", stations);

export default router;
