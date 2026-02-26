import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';
import { prisma } from '../lib/prisma.js';

export interface AuthenticatedRequest extends Request {
    user?: {
        id?: string;
        email?: string;
        name?: string;
    };
}

export const authMiddleware = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: "Authorization header is missing !" });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: "Access token is missing !" });
    }

    /**
     * @comment if decoded is false, throw error
     */
    try {
        const decoded = jwt.verify(token, config.JWT_SECRET!) as { id: string };

        const user = await prisma.user.findUnique({
            where: { id: decoded.id },
            select: { id: true, email: true, name: true }
        });

        if (!user) {
            return res.status(401).json({ error: "User not found !" });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ error: "Invalid or expired token !" });
    }
}