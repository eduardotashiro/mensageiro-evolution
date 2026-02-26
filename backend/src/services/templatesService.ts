import { prisma } from '../lib/prisma.js';

export async function createTemplate(title: string, subject: string, body: string, authorId: string) {

    const template = await prisma.template.create({
        data: {
            title,
            subject,
            body,
            authorId
        }
    });

    return template;
}

export async function getTemplates( authorId: string) {

    const template = await prisma.template.findMany({
        where: {authorId }

    });

    return template;
}


export async function updateTemplate(id: string, authorId: string, title: string, subject: string, body: string) {

    const template = await prisma.template.update({
        where: {
            id,
            authorId
        },
        data: {
            title,
            subject,
            body
        }
    });

    return template;
}

export async function deleteTemplate(id: string, authorId: string) {

    const template = await prisma.template.delete({
        where: {
            id,
            authorId
        },

    });
    return template;
}   
