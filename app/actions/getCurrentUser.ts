import { getServerSession } from "next-auth/next";
import prisma from "../libs/client";
import { authOptions } from "../libs/auth";

export async function getSession() {
    return await getServerSession(authOptions);
}

export default async function getCurrentUser() {
    try {
        const session = await getSession();

        if (!session) {
            console.error("User is not authenticated");
            return null;
        }

        const currentUser = await prisma.user.findUnique({
            where: {
                email: session.user?.email as string,
            },
        });

        if (!currentUser) {
            console.error("Something went wrong!");
            return null;
        }

        return currentUser;
    } catch (error) {
        console.log("error :>> ", error);
    }

    return null;
}
