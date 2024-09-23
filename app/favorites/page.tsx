import getCurrentUser from "../actions/getCurrentUser";
import { getFavoriteListings } from "../actions/getFavoriteListings";
import Container from "../components/Container";
import EmptyState from "../components/EmptyState";
import Heading from "../components/Heading";
import FavoritesClient from "./FavoritesClient";

async function FavoritesPage() {
    const favoriteListings = await getFavoriteListings();
    const currentUser = await getCurrentUser();

    if (!favoriteListings.length) {
        return (
            <EmptyState
                title="No favorites found"
                subtitle="Looks like you don't have favorite listings"
            />
        );
    }

    return (
        <Container>
            <Heading
                title="Favorites"
                subtitle="List of places you have favorited"
            />
            <FavoritesClient
                favListings={favoriteListings}
                currentUser={currentUser}
            />
        </Container>
    );
}

export default FavoritesPage;
