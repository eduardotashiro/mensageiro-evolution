import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {sendEmailController} from "../controllers/email.controller.js";
const router = Router();

router.use(authMiddleware);
router.post("/send", sendEmailController);

export default router;