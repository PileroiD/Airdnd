import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/client";
import { NextResponse } from "next/server";

export async function DELETE(request: Request, { params }: { params: any }) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const { listingId } = params;

    if (!listingId || typeof listingId !== "string") {
        return new NextResponse("Invalid listing id", { status: 500 });
    }

    const listing = await prisma.listing.delete({
        where: {
            id: listingId,
            userId: currentUser.id,
        },
    });

    return NextResponse.json(listing);
}
