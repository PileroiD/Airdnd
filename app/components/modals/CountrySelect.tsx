"use client";

import useCountries, { CountrySelectValue } from "@/app/hooks/useCountries";
import Select from "react-select";

interface CountrySelectProps {
    value?: CountrySelectValue;
    onChange: (value: CountrySelectValue) => void;
}

function CountrySelect({ value, onChange }: CountrySelectProps) {
    const { countries } = useCountries();

    return (
        <div>
            <Select
                placeholder="Anywhere"
                isClearable
                options={countries}
                value={value}
                onChange={(value) => onChange(value as CountrySelectValue)}
                formatOptionLabel={(option: any) => (
                    <div className="flex flex-row items-center gap-3">
                        <span>{option.flag}</span>
                        <div>
                            {option.label},
                            <span className="text-neutral-500 ml-1">
                                {option.region}
                            </span>
                        </div>
                    </div>
                )}
                classNames={{
                    control: () => "p-3 border-2",
                    input: () => "text-lg",
                    option: () => "text-lg",
                }}
                theme={(theme) => ({
                    ...theme,
                    borderRadius: 6,
                    colors: {
                        ...theme.colors,
                        primary: "black",
                        primary25: "#ffe4e6",
                    },
                })}
            />
        </div>
    );
}

export default CountrySelect;
