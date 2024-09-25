"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

function Logo() {
    const router = useRouter();
    return (
        <div
            onClick={() => router.push("/")}
            className="flex items-center gap-2 cursor-pointer"
        >
            <Image
                src="/images/logo.png"
                alt="logo"
                width={30}
                height={30}
                className="hidden md:block"
            />
            <h1 className="font-bold text-xl lg:text-2xl text-rose-500 ">
                Airdnd
            </h1>
        </div>
    );
}

export default Logo;
