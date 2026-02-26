import { prisma } from '../lib/prisma.js';
import { z } from "zod";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';

const loginUserSchema = z.object({
    email: z.email(),
    password: z.string().min(8, { message: "Password must be at least 8 characters long !" }),
});

export async function loginUser(email: string, password: string) {

    loginUserSchema.parse({ email, password });

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
        throw new Error('Invalid email or password !');
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
        throw new Error('Invalid email or password !');
    }
 
    const token = jwt.sign(
        {
            id: user.id,
            email: user.email,
            name: user.name
        },
        config.JWT_SECRET!,
        { expiresIn: "1d"}); //não consegui usar env...

    return { user, token };
}