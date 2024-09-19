"use client";

import { memo } from "react";
import { type IconType } from "react-icons";

interface ButtonProps {
    label: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    outline?: boolean;
    small?: boolean;
    icon?: IconType;
    showHoverAnimation?: boolean;
}

function Button({
    label,
    onClick,
    disabled,
    outline,
    small,
    icon: Icon,
    showHoverAnimation,
}: ButtonProps) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition w-full ${
                outline
                    ? "bg-white border-black text-black"
                    : "bg-rose-500 border-rose-500 text-white"
            } ${
                small
                    ? "py-1 text-sm font-light border-[1px]"
                    : "py-3 text-md font-semibold border-2"
            } ${showHoverAnimation && "hover:bg-neutral-200 transition"}`}
        >
            {Icon && <Icon size={24} className="absolute left-4 top-3" />}
            {label}
        </button>
    );
}

export default memo(Button);
