"use client";

export default function AddItemDialog({
    type,
    value,
    onChange,
    onAdd,
    onCancel,
}) {
    return (
        <div className="dialog flex flex-col items-center">
            <input
                type="text"
                value={value}
                onChange={onChange}
                placeholder={
                    type === "text" ? "Enter item name" : "Enter image URL"
                }
            />
            <div className="flex gap-3 p-3">
                <button className="tertiary" onClick={onAdd}>
                    Add
                </button>
                <button className="destructive" onClick={onCancel}>
                    Cancel
                </button>
            </div>
        </div>
    );
}
