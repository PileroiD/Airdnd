"use client";

import Image from "next/image";

function Avatar({ src }: { src?: string | null | undefined }) {
    return (
        <Image
            src={`${(src as string) || "/images/avatar-placeholder.png"}`}
            alt="avatar"
            className="rounded-full"
            width={30}
            height={30}
        />
    );
}

export default Avatar;
