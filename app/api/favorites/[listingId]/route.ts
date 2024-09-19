import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/client";
import { NextResponse } from "next/server";

export async function POST(request: Request, { params }: { params: any }) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const { listingId } = params;

    if (!listingId || typeof listingId !== "string") {
        return new NextResponse("Invalid listing id", { status: 500 });
    }

    const favoriteIds = [...(currentUser.favoriteIds || []), listingId];

    const user = await prisma.user.update({
        where: {
            id: currentUser.id,
        },
        data: {
            favoriteIds,
        },
    });

    return NextResponse.json(user);
}

export async function DELETE(request: Request, { params }: { params: any }) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const { listingId } = params;

    if (!listingId || typeof listingId !== "string") {
        return new NextResponse("Invalid listing id", { status: 500 });
    }

    const favoriteIds = [...(currentUser.favoriteIds || [])].filter(
        (favId) => favId !== listingId
    );

    const user = await prisma.user.update({
        where: {
            id: currentUser.id,
        },
        data: {
            favoriteIds,
        },
    });

    return NextResponse.json(user);
}
