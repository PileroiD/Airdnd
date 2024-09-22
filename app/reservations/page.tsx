import getCurrentUser from "../actions/getCurrentUser";
import { getReservations } from "../actions/getReservations";
import Container from "../components/Container";
import EmptyState from "../components/EmptyState";
import Heading from "../components/Heading";
import ReservationsClient from "./ReservationsClient";

async function ReservationsPage() {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return <EmptyState title="Unauthorized" subtitle="Please login" />;
    }

    const reservations = await getReservations({ authorId: currentUser.id });

    if (reservations?.length === 0) {
        return (
            <EmptyState
                title="No reservations found"
                subtitle="Looks like you have no reservations on your property"
            />
        );
    }

    return (
        <Container>
            <Heading
                title="Reservations"
                subtitle="Booking on your properties"
            />
            <ReservationsClient
                reservations={reservations}
                currentUser={currentUser}
            />
        </Container>
    );
}

export default ReservationsPage;
