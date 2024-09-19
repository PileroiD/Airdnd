import { useLoginModal } from "./useLoginModal";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import toast from "react-hot-toast";

interface IUseFavorite {
    listingId: string;
    currentUser?: User | null;
}

export const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
    const router = useRouter();
    const loginModal = useLoginModal();

    const hasFavorited = useMemo(
        () => currentUser?.favoriteIds?.includes(listingId) ?? false,
        [currentUser, listingId]
    );

    const addToFavorites = async () => {
        try {
            await axios.post(`/api/favorites/${listingId}`);
            toast.success("Added to favorites!", {
                duration: 3000,
                position: "bottom-right",
            });
            router.refresh();
        } catch {
            toast.error("Failed to add to favorites!", {
                duration: 3000,
                position: "bottom-right",
            });
        }
    };

    const removeFromFavorites = async () => {
        try {
            await axios.delete(`/api/favorites/${listingId}`);
            toast.success("Deleted from favorites!", {
                duration: 3000,
                position: "bottom-right",
            });
            router.refresh();
        } catch {
            toast.error("Failed to remove from favorites!", {
                duration: 3000,
                position: "bottom-right",
            });
        }
    };

    const toggleFavorite = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            e.stopPropagation();

            if (!currentUser) {
                return loginModal.onOpen();
            }

            if (hasFavorited) {
                removeFromFavorites();
            } else {
                addToFavorites();
            }
        },
        [currentUser, hasFavorited, listingId, loginModal, router]
    );

    return { hasFavorited, toggleFavorite };
};
