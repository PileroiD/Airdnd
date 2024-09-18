import { useMemo } from "react";
import countries from "world-countries";

const formattedCountries = countries.map((country) => ({
    value: country.cca2,
    label: country.name.common,
    flag: country.flag,
    latlng: country.latlng,
    region: country.region,
}));

const useCountries = () => {
    const countries = useMemo(() => formattedCountries, []);

    const getCountryByValue = (value: string) =>
        formattedCountries.find((country) => country.value === value);

    return { countries, getCountryByValue };
};

export const getServerCountryByValue = (countryInitials: string) =>
    formattedCountries.find((country) => country.value === countryInitials);

export type CountrySelectValue = {
    flag: string;
    label: string;
    latlng: number[];
    region: string;
    value: string;
};

export default useCountries;
