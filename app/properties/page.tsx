import getCurrentUser from "../actions/getCurrentUser";
import getListings from "../actions/getListings";
import Container from "../components/Container";
import EmptyState from "../components/EmptyState";
import Heading from "../components/Heading";
import PropertiesClient from "./PropertiesClient";

async function PropertiesPage() {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return <EmptyState title="Unauthorized" subtitle="Please login" />;
    }

    const listings = await getListings({ userId: currentUser?.id });

    if (!listings?.length) {
        return (
            <EmptyState
                title="No properties found"
                subtitle="Looks like you don't have any properties"
            />
        );
    }

    return (
        <Container>
            <Heading title="Properties" subtitle="List of your properties" />
            <PropertiesClient listings={listings} currentUser={currentUser} />
        </Container>
    );
}

export default PropertiesPage;
