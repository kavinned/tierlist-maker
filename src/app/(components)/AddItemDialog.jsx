"use client";

export default function AddItemDialog({
    type,
    value,
    onChange,
    onAdd,
    onCancel,
}) {
    return (
        <div className="dialog">
            <input
                type="text"
                value={value}
                onChange={onChange}
                placeholder={
                    type === "text" ? "Enter item name" : "Enter image URL"
                }
            />
            <button onClick={onAdd}>Add</button>
            <button onClick={onCancel}>Cancel</button>
        </div>
    );
}
