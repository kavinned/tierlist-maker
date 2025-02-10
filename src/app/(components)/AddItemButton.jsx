"use client";

import { PlusIcon } from "lucide-react";

export default function AddItemButton({ type, onClick, hidden }) {
    return (
        <button
            onClick={onClick}
            className={`action-buttons order-1 flex items-center gap-2 ${
                hidden ? "hidden" : ""
            } secondary`}
        >
            <PlusIcon className="w-4 h-4" />
            {type === "text" ? "Text Item" : "Image Item"}
        </button>
    );
}
