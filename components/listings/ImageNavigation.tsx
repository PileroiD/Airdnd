"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

function ImageNavigation({
    imageSrc,
    listingId,
}: {
    imageSrc: string;
    listingId: string;
}) {
    const router = useRouter();

    return (
        <Image
            src={imageSrc}
            fill
            alt="Listing"
            className="object-cover h-full w-full group-hover:scale-110 transition cursor-pointer"
            onClick={() => router.push(`/listings/${listingId}`)}
        />
    );
}

export default ImageNavigation;
