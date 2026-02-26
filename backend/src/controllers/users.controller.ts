import {getUsers} from "../services/usersService.js";
import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/authMiddleware.js";


export const getAllUsers = async (_req: AuthenticatedRequest, res: Response) => {
    const users = await getUsers();
    res.status(200).json({ message: "Users retrieved successfully", users });
}