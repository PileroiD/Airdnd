import prisma from "../libs/client";

export const getListingById = async (listingId?: string) => {
    try {
        const listing = await prisma.listing.findUnique({
            where: {
                id: listingId,
            },
            include: {
                user: true,
            },
        });

        if (!listing) {
            console.log("Listing cannot be found!");
            return null;
        }

        return listing;
    } catch (error) {
        console.log("Failed to get listing by id, error: ", error);
    }
};
