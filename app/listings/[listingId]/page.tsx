import getCurrentUser from "@/app/actions/getCurrentUser";
import { getListingById } from "@/app/actions/getListingById";
import Container from "@/app/components/Container";
import EmptyState from "@/app/components/EmptyState";
import ListingHead from "./ListingHead";
import ListingInfo from "./ListingInfo";
import { categories } from "@/app/constants/categories.data";
import ListingReservation from "./ListingReservation";
import { getReservations } from "@/app/actions/getReservations";

interface ListingPageProps {
    params: {
        listingId: string;
    };
}

async function ListingPage({ params: { listingId } }: ListingPageProps) {
    const listing = await getListingById(listingId);
    const reservations = await getReservations({ listingId });

    const listingCategory = categories.find(
        (category) => category.label === listing?.category
    );

    const currentUser = await getCurrentUser();

    if (!listing) {
        return (
            <EmptyState
                title="We couldn't find such listing"
                subtitle="Choose another one"
                showReset
                showResetLabel="Go back to main page"
            />
        );
    }

    return (
        <Container>
            <div className="max-w-screen-lg mx-auto">
                <div className="flex flex-col gap-6">
                    <ListingHead
                        title={listing.title}
                        imageSrc={listing.imageSrc}
                        locationValue={listing.locationValue}
                        id={listing.id}
                        currentUser={currentUser}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
                        <ListingInfo
                            user={listing.user}
                            category={listingCategory}
                            description={listing.description}
                            roomCount={listing.roomCount}
                            guestCount={listing.guestCount}
                            bathroomCount={listing.bathroomCount}
                            locationValue={listing.locationValue}
                        />
                        <div className="order-first mb-10 md:order-last md:col-span-3">
                            <ListingReservation
                                reservations={reservations}
                                currentUser={currentUser}
                                listingPrice={listing.price}
                                listingId={listingId}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default ListingPage;
