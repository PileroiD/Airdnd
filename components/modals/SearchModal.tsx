"use client";

import { useSearchModal } from "@/app/hooks/useSearchModal";
import Modal from "./Modal";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { Range } from "react-date-range";
import dynamic from "next/dynamic";
import { CountrySelectValue } from "@/app/hooks/useCountries";
import qs from "query-string";
import { formatISO } from "date-fns";
import Heading from "../Heading";
import CountrySelect from "./CountrySelect";
import Calendar from "../Inputs/Calendar";
import Counter from "../Inputs/Counter";

const Map = dynamic(() => import("../../components/Map"), { ssr: false });

enum STEPS {
    LOCATION = 0,
    DATE = 1,
    INFO = 2,
}

function SearchModal() {
    const searchModal = useSearchModal();
    const router = useRouter();
    const params = useSearchParams();

    const [step, setStep] = useState(STEPS.LOCATION);
    const [guestCount, setGuestCount] = useState(1);
    const [roomCount, setRoomCount] = useState(1);
    const [bathroomCount, setBathroomCount] = useState(1);
    const [location, setLocation] = useState<CountrySelectValue>();
    const [dateRange, setDateRange] = useState<Range>({
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
    });

    const onGoBack = () =>
        step > STEPS.LOCATION ? setStep((prev) => prev - 1) : null;

    const onGoNext = () =>
        step < STEPS.INFO ? setStep((prev) => prev + 1) : null;

    const onSubmit = useCallback(async () => {
        if (step !== STEPS.INFO) {
            return onGoNext();
        }

        let currentQuery = {};

        if (params) {
            currentQuery = qs.parse(params.toString());
        }

        const updatedQuery: any = {
            ...currentQuery,
            locationValue: location?.value,
            guestCount,
            roomCount,
            bathroomCount,
        };

        if (dateRange.startDate) {
            updatedQuery.startDate = formatISO(dateRange.startDate);
        }

        if (dateRange.endDate) {
            updatedQuery.endDate = formatISO(dateRange.endDate);
        }

        const url = qs.stringifyUrl(
            {
                url: "/",
                query: updatedQuery,
            },
            { skipNull: true }
        );

        setStep(STEPS.LOCATION);
        searchModal.onClose();

        router.push(url);
    }, [step, location, guestCount, roomCount, bathroomCount, dateRange]);

    const actionLabel = step === STEPS.INFO ? "Search" : "Next";
    const secondaryActionLabel = step === STEPS.LOCATION ? null : "Back";

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading
                title="Where do you want to go?"
                subtitle="Find the perfect location!"
            />
            <CountrySelect
                value={location}
                onChange={(value) => setLocation(value as CountrySelectValue)}
            />
            <hr />
            <Map center={location?.latlng} />
        </div>
    );

    if (step === STEPS.DATE) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="When do you plan to go?"
                    subtitle="Make sure everyone is free!"
                />
                <Calendar
                    value={dateRange}
                    onChange={(value) => setDateRange(value.selection)}
                />
            </div>
        );
    }

    if (step === STEPS.INFO) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="More information"
                    subtitle="Find your perfect place!"
                />
                <Counter
                    title="Guests"
                    subtitle="How many guests are coming?"
                    value={guestCount}
                    onChange={(value) => setGuestCount(value)}
                />
                <Counter
                    title="Rooms"
                    subtitle="How many rooms do you think you need?"
                    value={roomCount}
                    onChange={(value) => setRoomCount(value)}
                />
                <Counter
                    title="Bathrooms"
                    subtitle="How many bathrooms do you think you need?"
                    value={bathroomCount}
                    onChange={(value) => setBathroomCount(value)}
                />
            </div>
        );
    }

    return (
        <Modal
            isOpen={searchModal.isOpen}
            onClose={searchModal.onClose}
            onSubmit={onSubmit}
            title="Filters"
            actionLabel={actionLabel}
            secondaryAction={step === STEPS.LOCATION ? undefined : onGoBack}
            secondaryLabel={secondaryActionLabel}
            body={bodyContent}
            step={step}
        />
    );
}

export default SearchModal;
