import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/authMiddleware.js";
import { createTemplate, getTemplates, updateTemplate, deleteTemplate } from "../services/templatesService.js";


export const createEmailTemplate = async (req: AuthenticatedRequest, res: Response) => {
    const { title, subject, body } = req.body;
    const idUser = req.user?.id!;
    const template = await createTemplate(title, subject, body, idUser );
    res.status(201).json({ message: "Template created successfully", template });
}

export const getEmailTemplates = async (req: AuthenticatedRequest, res: Response) => {
    const idUser = req.user?.id!;
    const templates = await getTemplates(idUser);
    res.status(200).json({ message: "Templates retrieved successfully", templates });
}

export const updateEmailTemplate = async (req: AuthenticatedRequest, res: Response) => {
    const {id: Templateid } = req.params as { id: string };
    const idUser = req.user?.id!;
    const { title, subject, body } = req.body;
    const template = await updateTemplate(Templateid, idUser, title, subject, body);
    res.status(200).json({ message: "Template updated successfully", template });
}

export const deleteEmailTemplate = async (req: AuthenticatedRequest, res: Response) => {
    const {id: Templateid } = req.params as { id: string };
    const idUser = req.user?.id!;
    await deleteTemplate(Templateid, idUser);
    res.status(204).send();
}


