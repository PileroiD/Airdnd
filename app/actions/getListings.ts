import prisma from "../libs/client";

export default async function getListings() {
    try {
        const listings = await prisma.listing.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });

        return listings;
    } catch (error) {
        console.log("error :>> ", error);
    }
}
