import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { getAllUsers } from "../controllers/users.controller.js";
const router = Router();

router.use(authMiddleware);
router.get("/", getAllUsers);

export default router;