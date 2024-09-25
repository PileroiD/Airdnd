"use client";

import { useLoginModal } from "@/app/hooks/useLoginModal";
import Button from "@/components/Button";
import Calendar from "@/components/Inputs/Calendar";
import { Reservation, User } from "@prisma/client";
import axios from "axios";
import { eachDayOfInterval } from "date-fns";
import { differenceInCalendarDays } from "date-fns/fp";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Range } from "react-date-range";
import toast from "react-hot-toast";

const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
};

interface ListingReservationProps {
    reservations: Reservation[] | undefined;
    currentUser?: User | null;
    listingPrice: number;
    listingId: string;
}

function ListingReservation({
    reservations = [],
    currentUser,
    listingPrice,
    listingId,
}: ListingReservationProps) {
    const loginModal = useLoginModal();
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    const [totalPrice, setTotalPrice] = useState(listingPrice);
    const [dateRange, setDateRange] = useState<Range>(initialDateRange);

    const disabledDates = useMemo(() => {
        let dates: Date[] = [];

        reservations?.forEach((reservation) => {
            const range = eachDayOfInterval({
                start: new Date(reservation.startDate),
                end: new Date(reservation.endDate),
            });

            dates = [...dates, ...range];
        });

        return dates;
    }, [reservations]);

    const onCreateReservation = () => {
        if (!currentUser) return loginModal.onOpen();

        setIsLoading(true);

        axios
            .post("/api/reservations", {
                totalPrice,
                startDate: dateRange.startDate,
                endDate: dateRange.endDate,
                listingId,
            })
            .then(() => {
                toast.success("Listing reserved!", {
                    duration: 3000,
                    position: "bottom-right",
                });
                setDateRange(initialDateRange);
                // redirect to /trips
                router.refresh();
            })
            .catch(() =>
                toast.error("Failed to reserve chosen listing!", {
                    duration: 3000,
                    position: "bottom-right",
                })
            )
            .finally(() => setIsLoading(false));
    };

    useEffect(() => {
        if (dateRange.startDate && dateRange.endDate) {
            const dayCount = differenceInCalendarDays(
                dateRange.startDate,
                dateRange.endDate
            );

            if (dayCount && listingPrice) {
                setTotalPrice(dayCount * listingPrice);
            } else {
                setTotalPrice(listingPrice);
            }
        }
    }, [dateRange, listingPrice]);

    return (
        <div className="bg-wgite rounded-xl border-[1px] border-neutral-200 overflow-hidden">
            <div className="flex flex-row items-center gap-1 p-4">
                <div className="text-2xl font-semibold">{listingPrice}</div>
                <div className="font-light text-neutral-600">night</div>
            </div>
            <hr />
            <Calendar
                value={dateRange}
                disabledDates={disabledDates}
                onChange={(value) => setDateRange(value.selection)}
            />
            <hr />
            <div className="p-4">
                <Button
                    disabled={isLoading}
                    label="Reserve"
                    onClick={onCreateReservation}
                />
            </div>
            <div className="p-4 flex flex-row items-center justify-between font-semibold text-lg">
                <div>Total</div>
                <div>$ {totalPrice}</div>
            </div>
        </div>
    );
}

export default ListingReservation;
