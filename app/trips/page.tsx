export const dynamic = "force-dynamic";

import EmptyState from "@/components/EmptyState";
import getCurrentUser from "../actions/getCurrentUser";
import { getReservations } from "../actions/getReservations";
import TripsClient from "./TripsClient";
import Container from "@/components/Container";
import Heading from "@/components/Heading";

async function TripsPage() {
    const currentUser = await getCurrentUser();
    const reservations = await getReservations({ userId: currentUser?.id });

    if (!currentUser) {
        return <EmptyState title="Unauthorized" subtitle="Please login" />;
    }

    if (!reservations?.length) {
        return (
            <EmptyState
                title="No trips found"
                subtitle="Looks like you haven't reserved any trips"
            />
        );
    }

    return (
        <Container>
            <Heading
                title="Trips"
                subtitle="Where you've been and where you're going"
            />
            <TripsClient
                reservations={reservations}
                currentUser={currentUser}
            />
        </Container>
    );
}

export default TripsPage;
