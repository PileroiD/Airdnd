import prisma from "../libs/client";

export interface IListingsParams {
    userId?: string;
}

export default async function getListings(params: IListingsParams) {
    try {
        const query: any = {};
        const { userId } = params;

        if (userId) {
            query.userId = userId;
        }

        const listings = await prisma.listing.findMany({
            where: query,
            orderBy: {
                createdAt: "desc",
            },
        });

        return listings;
    } catch (error) {
        console.log("error :>> ", error);
    }
}
