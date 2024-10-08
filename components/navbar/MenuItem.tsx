"use client";

interface MenuItemProps {
    onClick: () => void;
    label: string;
}

function MenuItem({ onClick, label }: MenuItemProps) {
    return (
        <div
            className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
            onClick={onClick}
        >
            {label}
        </div>
    );
}

export default MenuItem;
