import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const body = await request.json();

    const isAllFilled = Object.values(body).every((value) => value);

    if (!isAllFilled) {
        return new NextResponse("Missing fields", { status: 500 });
    }

    const { totalPrice, startDate, endDate, listingId } = body;

    const listingAndReservation = await prisma.listing.update({
        where: {
            id: listingId,
        },
        data: {
            reservations: {
                create: {
                    totalPrice,
                    startDate,
                    endDate,
                    userId: currentUser.id,
                },
            },
        },
    });

    return NextResponse.json(listingAndReservation);
}
