import prisma from "../libs/client";

export const getReservations = async () => {
    try {
        const reservations = await prisma.reservation.findMany();
        return reservations;
    } catch (error) {
        console.log("error :>> ", error);
    }
};
