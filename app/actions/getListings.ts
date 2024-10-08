import prisma from "../libs/client";

export interface IListingsParams {
    userId?: string;
    guestCount?: number;
    roomCount?: number;
    bathroomCount?: number;
    startDate?: string;
    endDate?: string;
    locationValue?: string;
    category?: string;
}

export default async function getListings(params: IListingsParams) {
    try {
        const query: Record<string, any> = {};

        const {
            userId,
            guestCount,
            roomCount,
            bathroomCount,
            startDate,
            endDate,
            locationValue,
            category,
        } = params;

        if (userId) query.userId = userId;

        if (category) query.category = category;

        if (roomCount) {
            query.roomCount = {
                gte: +roomCount,
            };
        }
        if (guestCount) {
            query.guestCount = {
                gte: +guestCount,
            };
        }
        if (bathroomCount) {
            query.bathroomCount = {
                gte: +bathroomCount,
            };
        }

        if (locationValue) query.locationValue = locationValue;

        if (startDate && endDate) {
            query.NOT = {
                reservations: {
                    some: {
                        OR: [
                            {
                                endDate: { gte: startDate },
                                startDate: { lte: startDate },
                            },
                            {
                                startDate: { lte: endDate },
                                endDate: { gte: endDate },
                            },
                        ],
                    },
                },
            };
        }

        const listings = await prisma.listing.findMany({
            where: query,
            orderBy: {
                createdAt: "desc",
            },
        });

        return listings;
    } catch (error) {
        console.error("Failed to fetch listings:", error);
        throw new Error("Failed to fetch listings");
    }
}
