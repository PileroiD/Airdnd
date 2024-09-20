"use client";

import { Listing, Reservation, User } from "@prisma/client";
import ListingCard from "../components/listings/ListingCard";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import axios from "axios";
import { showToastNotification } from "../utils/showToastNotification";

interface TripsClientProps {
    reservations: (Reservation & { listing: Listing })[];
    currentUser: User | null;
}

function TripsClient({ reservations, currentUser }: TripsClientProps) {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState("");

    const onCancel = useCallback((id: string) => {
        setDeletingId(id);

        axios
            .delete(`/api/reservations/${id}`)
            .then(() => {
                showToastNotification("success", "Reservation canceled");
                router.refresh();
            })
            .catch((error) =>
                showToastNotification(
                    "error",
                    (error?.response?.data?.error as string) ||
                        "Something went wrong!"
                )
            )
            .finally(() => setDeletingId(""));
    }, []);

    return (
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
            {reservations.map((reservation) => (
                <ListingCard
                    key={reservation.id}
                    data={reservation.listing}
                    reservation={reservation}
                    actionId={reservation.id}
                    onAction={onCancel}
                    disabled={deletingId === reservation.id}
                    actionLabel="Cancel reservation"
                    currentUser={currentUser}
                />
            ))}
        </div>
    );
}

export default TripsClient;
