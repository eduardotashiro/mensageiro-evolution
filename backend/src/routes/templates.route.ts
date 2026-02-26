import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {createEmailTemplate, deleteEmailTemplate, getEmailTemplates, updateEmailTemplate} from "../controllers/template.controller.js";
const router = Router();



router.use(authMiddleware);
router.post("/", createEmailTemplate);
router.get("/", getEmailTemplates);
router.patch("/:id", updateEmailTemplate);
router.delete("/:id", deleteEmailTemplate);


export default router;