"use client";

import { Listing, Reservation, User } from "@prisma/client";
import ListingCard from "../components/listings/ListingCard";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import axios from "axios";
import { showToastNotification } from "../utils/showToastNotification";

interface PropertiesClientProps {
    listings: Listing[];
    currentUser: User | null;
}

function PropertiesClient({ listings, currentUser }: PropertiesClientProps) {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState("");

    const onCancel = useCallback((id: string) => {
        setDeletingId(id);

        axios
            .delete(`/api/listings/${id}`)
            .then(() => {
                showToastNotification("success", "Listing deleted");
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
            {listings.map((listing) => (
                <ListingCard
                    key={listing.id}
                    data={listing}
                    actionId={listing.id}
                    onAction={onCancel}
                    disabled={deletingId === listing.id}
                    actionLabel="Delete property"
                    currentUser={currentUser}
                />
            ))}
        </div>
    );
}

export default PropertiesClient;
