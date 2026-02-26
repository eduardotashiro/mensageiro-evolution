import { prisma } from '../lib/prisma.js';
import { z } from "zod";
import bcrypt from 'bcrypt';


const createUserSchema = z.object({
    email: z.email({ message: "Invalid email address !" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters long !" }),
    name: z.string().min(1, { message: "Name is required !" }),
});

export async function registerUser(email: string, password: string, name: string) {
    
    createUserSchema.parse({ email, password, name }); 

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
        throw new Error('Email already in use !');
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: { email, passwordHash, name }
    });

    return user;
}

