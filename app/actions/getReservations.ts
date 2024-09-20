import prisma from "../libs/client";

interface IProps {
    listingId?: string;
    userId?: string;
    authorId?: string;
}

export const getReservations = async ({
    listingId,
    userId,
    authorId,
}: IProps) => {
    try {
        const query: any = {};

        if (listingId) {
            query.listingId = listingId;
        }
        if (userId) {
            query.userId = userId;
        }
        if (authorId) {
            query.listing = { userId: authorId };
        }

        const reservations = await prisma.reservation.findMany({
            where: query,
            include: {
                listing: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return reservations;
    } catch (error) {
        console.log("error :>> ", error);
    }
};
