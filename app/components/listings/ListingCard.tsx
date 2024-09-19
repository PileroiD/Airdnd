import { getServerCountryByValue } from "@/app/hooks/useCountries";
import { Listing, Reservation, User } from "@prisma/client";
import { format } from "date-fns";
import HeartButton from "./HeartButton";
import Button from "../Button";
import { useCallback } from "react";
import ImageNavigation from "./ImageNavigation";
import { getLocation } from "@/app/utils/getLocation";

interface ListingCardProps {
    data: Listing;
    reservation?: Reservation;
    onAction?: (id: string) => void;
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
    currentUser?: User | null;
}

function ListingCard({
    data,
    reservation,
    onAction,
    disabled,
    actionLabel,
    actionId = "",
    currentUser,
}: ListingCardProps) {
    const location = getServerCountryByValue(data.locationValue);

    const handleCancel = useCallback(() => {
        if (disabled) return;
        onAction?.(actionId);
    }, []);

    const price = reservation ? reservation.totalPrice : data.price;

    const reservationDate = () => {
        if (!reservation) return;

        const startDate = new Date(reservation.createdAt);
        const endDate = new Date(reservation.endDate);

        return `${format(startDate, "PP")} - ${format(endDate, "PP")}`;
    };

    return (
        <div className="col-span-1 group">
            <div className="flex flex-col gap-2 w-full">
                <div className="aspect-square w-full relative overflow-hidden rounded-xl">
                    <ImageNavigation
                        imageSrc={data?.imageSrc}
                        listingId={data?.id}
                    />
                    <div className="absolute top-3 right-3">
                        <HeartButton
                            listingId={data.id}
                            currentUser={currentUser}
                        />
                    </div>
                </div>
                <div className="font-semibold text-lg">
                    {getLocation(location)}
                </div>
                <div className="font-light text-neutral-500">
                    {reservationDate() || data.category}
                </div>
                <div className="flex flex-row items-center gap-1">
                    <div className="font-semibold">$ {price}</div>
                    {!reservation && <div className="font-light">night</div>}
                </div>
                {onAction && actionLabel && (
                    <Button
                        disabled={disabled}
                        small
                        label={actionLabel}
                        onClick={handleCancel}
                    />
                )}
            </div>
        </div>
    );
}

export default ListingCard;
