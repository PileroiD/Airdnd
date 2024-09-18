import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import prisma from "../libs/client";

export async function getSession() {
    return await getServerSession(authOptions);
}

export default async function getCurrentUser() {
    try {
        const session = await getSession();

        if (!session) {
            throw new Error("User is not authenticated");
        }

        const currentUser = await prisma.user.findUnique({
            where: {
                email: session.user?.email as string,
            },
        });

        if (!currentUser) {
            console.error("Something went wrong!");
            return;
        }

        return currentUser;
    } catch (error) {
        console.log("error :>> ", error);
    }
}
