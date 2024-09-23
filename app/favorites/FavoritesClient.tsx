import { Listing, User } from "@prisma/client";
import ListingCard from "../components/listings/ListingCard";

interface FavoritesClientProps {
    favListings: Listing[];
    currentUser: User | null;
}

function FavoritesClient({ favListings, currentUser }: FavoritesClientProps) {
    return (
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
            {favListings.map((listing) => (
                <ListingCard
                    key={listing.id}
                    data={listing}
                    currentUser={currentUser}
                />
            ))}
        </div>
    );
}

export default FavoritesClient;
