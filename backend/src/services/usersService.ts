import { prisma } from "../lib/prisma.js";

export async function getUsers() {
    const users = await prisma.user.findMany({
        select: { id: true, name: true, email: true }
    });
    return users;
}