import { prisma } from "../lib/prisma.js";

export async function sendEmail(templateId: string, senderId: string, recipientIds: string[]) {

    const template = await prisma.template.findUnique({
        where: { id: templateId }
    });
    if (!template) {
        throw new Error("Template not found!");
    }

    const sender = await prisma.user.findUnique({
        where: { id: senderId }
    });
    if (!sender) {
        throw new Error("Sender not found!");
    }

    const recipients = await prisma.user.findMany({
        where: { id: { in: recipientIds } }
    });

    if (recipients.length === 0) {
        throw new Error("Recipients not found!");
    }


    const emails = recipients.map(recipient => {
        const body = template.body.replace(/{{destinatário}}/g, recipient.name).replace(/{{remetente}}/g, sender.name);

        return {
            id: recipient.id,
            name: recipient.name,
            email: recipient.email,
            body
        };
    });


    await prisma.email.create({
        data: {
            subject: template.subject,
            body: template.body,
            recipients: recipients.map(r => r.email),
            templateId: template.id,
            userId: senderId
        }
    });

    return { emails };

}