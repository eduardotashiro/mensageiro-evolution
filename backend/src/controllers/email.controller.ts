import {sendEmail} from "../services/emailService.js";
import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/authMiddleware.js";

export const sendEmailController = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const { templateId, recipientIds } = req.body;
        const senderId = req.user?.id!;
        const result = await sendEmail(templateId, senderId, recipientIds);
        res.status(200).json({ message: "Email sent successfully", result });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
            return;
        }
        res.status(500).json({ error: "Internal server error" });
    }
}