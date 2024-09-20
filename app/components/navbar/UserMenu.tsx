"use client";

import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import { useCallback, useEffect, useState } from "react";
import MenuItem from "./MenuItem";
import { useRegisterModal } from "@/app/hooks/useRegisterModal";
import { useLoginModal } from "@/app/hooks/useLoginModal";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";
import { useRentModal } from "@/app/hooks/useRentModal";
import { useRouter } from "next/navigation";

interface UserMenuProps {
    currentUser?: User | null;
}

function UserMenu({ currentUser }: UserMenuProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [currentUserData, setCurrentUserData] = useState(currentUser);
    const rentModal = useRentModal();

    const router = useRouter();

    useEffect(() => {
        setCurrentUserData(currentUser);
    }, [currentUser]);

    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();

    const toggleOpen = useCallback(() => {
        setIsOpen((prev) => !prev);
    }, []);

    const handleLogOut = () => {
        signOut({ redirect: false });
        setCurrentUserData(null);
    };

    const onRent = () => {
        if (!currentUser) {
            loginModal.onOpen();
            return;
        }

        rentModal.onOpen();
    };

    return (
        <div className="relative">
            <div className="flex flex-row items-center gap-3">
                <div
                    className="hidden lg:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
                    onClick={onRent}
                >
                    Airdnd your home
                </div>
                <div
                    className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
                    onClick={toggleOpen}
                >
                    <AiOutlineMenu />
                    <div className="hidden md:block">
                        <Avatar src={currentUserData?.image as string} />
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
                    <div className="flex flex-col cursor-pointer">
                        {currentUserData ? (
                            <>
                                <MenuItem
                                    label="My trips"
                                    onClick={() => {
                                        router.push("/trips");
                                        setIsOpen(false);
                                    }}
                                />
                                <MenuItem
                                    label="My favorites"
                                    onClick={() => {}}
                                />
                                <MenuItem
                                    label="My reservations"
                                    onClick={() => {}}
                                />
                                <MenuItem
                                    label="My properties"
                                    onClick={() => {}}
                                />
                                <MenuItem
                                    label="Airdnd my home"
                                    onClick={() => rentModal.onOpen()}
                                />
                                <hr />
                                <MenuItem
                                    label="Log out"
                                    onClick={handleLogOut}
                                />
                            </>
                        ) : (
                            <>
                                <MenuItem
                                    label="Login"
                                    onClick={loginModal.onOpen}
                                />
                                <MenuItem
                                    label="Sign up"
                                    onClick={registerModal.onOpen}
                                />
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserMenu;
