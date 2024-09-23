import prisma from "../libs/client";
import getCurrentUser from "./getCurrentUser";

export const getFavoriteListings = async () => {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return [];
        }

        const favorites = await prisma.listing.findMany({
            where: {
                id: {
                    in: [...(currentUser.favoriteIds || [])],
                },
            },
        });

        return favorites;
    } catch (err: any) {
        throw new Error(err);
    }
};
