import { getServerCountryByValue } from "@/app/hooks/useCountries";
import { Listing, Reservation, User } from "@prisma/client";
import { format } from "date-fns";
import Image from "next/image";
import HeartButton from "./HeartButton";
import Button from "../Button";
import Link from "next/link";

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

    const handleCancel = () => {
        if (disabled) return;
        onAction?.(actionId);
    };

    const price = reservation ? reservation.totalPrice : data.price;

    const reservationDate = () => {
        if (!reservation) return;

        const startDate = new Date(reservation.createdAt);
        const endDate = new Date(reservation.endDate);

        return `${format(startDate, "PP")} - ${format(endDate, "PP")}`;
    };

    return (
        <Link href={data.id} className="col-span-1 group">
            <div className="flex flex-col gap-2 w-full">
                <div className="aspect-square w-full relative overflow-hidden rounded-xl">
                    <Image
                        src={data.imageSrc}
                        fill
                        alt="Listing"
                        className="object-cover h-full w-full group-hover:scale-110 transition cursor-pointer"
                    />
                    <div className="absolute top-3 right-3">
                        <HeartButton
                            listingId={data.id}
                            currentUser={currentUser}
                        />
                    </div>
                </div>
                <div className="font-semibold text-lg">
                    {location?.region}, {location?.label}
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
        </Link>
    );
}

export default ListingCard;
