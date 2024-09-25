import { getServerCountryByValue } from "@/app/hooks/useCountries";
import { getLocation } from "@/app/utils/getLocation";
import Heading from "@/components/Heading";
import HeartButton from "@/components/listings/HeartButton";
import { User } from "@prisma/client";
import Image from "next/image";

interface ListingHeadProps {
    title: string;
    imageSrc: string;
    locationValue: string;
    id: string;
    currentUser?: User | null;
}

function ListingHead({
    title,
    imageSrc,
    locationValue,
    id,
    currentUser,
}: ListingHeadProps) {
    const location = getServerCountryByValue(locationValue);

    return (
        <>
            <Heading title={title} subtitle={getLocation(location)} />
            <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
                <Image
                    src={imageSrc}
                    alt="Listing image"
                    fill
                    className="object-cover w-full"
                />
                <div className="absolute top-5 right-5">
                    <HeartButton listingId={id} currentUser={currentUser} />
                </div>
            </div>
        </>
    );
}

export default ListingHead;
