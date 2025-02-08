"use client";

export default function AddItemButton({ type, onClick, hidden }) {
    return (
        <button
            onClick={onClick}
            className={`mb-4 ${hidden ? "hidden" : ""} secondary`}
        >
            {type === "text" ? "Add Text Item" : "Add Image Item"}
        </button>
    );
}
