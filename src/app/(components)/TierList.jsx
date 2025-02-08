"use client";

import { useState } from "react";
import UnrankedContainer from "./UnrankedContainer";
import AddItemButton from "./AddItemButton";
import AddItemDialog from "./AddItemDialog";

export default function TierList() {
    const [isEditingName, setIsEditingName] = useState(false);
    const [tierListName, setTierListName] = useState("Tier List");
    const [items, setItems] = useState({
        Unranked: { name: "Unranked", color: "#2c2c2c", items: [] },
        S: { name: "S", color: "#2c2c2c", items: [] },
        A: { name: "A", color: "#2c2c2c", items: [] },
        B: { name: "B", color: "#2c2c2c", items: [] },
    });
    const [showTextDialog, setShowTextDialog] = useState(false);
    const [showImageDialog, setShowImageDialog] = useState(false);
    const [newItemName, setNewItemName] = useState("");
    const [newItemImage, setNewItemImage] = useState("");
    const [showEditDialog, setShowEditDialog] = useState(false);
    const [editTier, setEditTier] = useState(null);
    const [editName, setEditName] = useState("");
    const [editColor, setEditColor] = useState("");

    const toggleEditName = () => {
        setIsEditingName(true);
    };

    const handleEditName = () => {
        setTierListName(tierListName);
        setIsEditingName(false);
    };

    const addTextItem = () => {
        setShowTextDialog(true);
    };

    const addImageItem = () => {
        setShowImageDialog(true);
    };

    const handleAddTextItem = () => {
        setItems((prevItems) => ({
            ...prevItems,
            Unranked: {
                ...prevItems.Unranked,
                items: [
                    ...prevItems.Unranked.items,
                    { name: newItemName, image: "" },
                ],
            },
        }));
        setShowTextDialog(false);
        setNewItemName("");
    };

    const handleAddImageItem = () => {
        setItems((prevItems) => ({
            ...prevItems,
            Unranked: {
                ...prevItems.Unranked,
                items: [
                    ...prevItems.Unranked.items,
                    { name: "", image: newItemImage },
                ],
            },
        }));
        setShowImageDialog(false);
        setNewItemImage("");
    };

    const moveItem = (fromTier, toTier, index) => {
        setItems((prevItems) => {
            const item = prevItems[fromTier].items[index];
            const newFromTier = {
                ...prevItems[fromTier],
                items: prevItems[fromTier].items.filter((_, i) => i !== index),
            };
            const newToTier = {
                ...prevItems[toTier],
                items: [...prevItems[toTier].items, item],
            };
            return {
                ...prevItems,
                [fromTier]: newFromTier,
                [toTier]: newToTier,
            };
        });
    };

    const removeItem = (tier, index) => {
        setItems((prevItems) => ({
            ...prevItems,
            [tier]: {
                ...prevItems[tier],
                items: prevItems[tier].items.filter((_, i) => i !== index),
            },
        }));
    };

    const handleEditTier = (tier) => {
        setEditTier(tier);
        setEditName(items[tier].name);
        setEditColor(items[tier].color);
        setShowEditDialog(true);
    };

    const handleDeleteTier = (tier) => {
        setItems((prevItems) => {
            const newItems = { ...prevItems };
            delete newItems[tier];
            return newItems;
        });
    };

    const handleSaveEdit = () => {
        if (!editTier || !items[editTier]) {
            console.error("No tier selected for editing");
            return;
        }

        setItems((prevItems) => ({
            ...prevItems,
            [editTier]: {
                ...prevItems[editTier],
                id: editTier,
                name: editName,
                color: editColor,
                items: prevItems[editTier].items || [],
            },
        }));

        setShowEditDialog(false);
        setEditTier(null);
        setEditName("");
        setEditColor("");
    };

    return (
        <div className="container">
            <div className="w-full h-16 bg-slate-500 flex items-center justify-center rounded-xl">
                {!isEditingName ? (
                    <>
                        <h1 className="text-3xl font-bold text-center m-4">
                            {tierListName}
                        </h1>
                        <button
                            onClick={toggleEditName}
                            className="tertiary"
                            type="button"
                        >
                            Edit
                        </button>
                    </>
                ) : (
                    <>
                        <input
                            type="text"
                            value={tierListName}
                            onChange={(e) => setTierListName(e.target.value)}
                            className="text-3xl font-bold text-center m-4 bg-transparent border border-white rounded-md"
                        />
                        <button
                            onClick={handleEditName}
                            className="primary"
                            type="button"
                        >
                            Save
                        </button>
                    </>
                )}
            </div>
            {Object.keys(items)
                .filter((tier) => tier !== "Unranked")
                .map((tier) => (
                    <div className="tier" key={items[tier].name}>
                        <div
                            className="tier-header relative"
                            style={{ backgroundColor: items[tier].color }}
                        >
                            <p>{items[tier].name}</p>
                            <div className="flex gap-2 absolute bottom-3">
                                <button
                                    className="tier-header-button primary"
                                    onClick={() => handleEditTier(tier)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="tier-header-button destructive"
                                    onClick={() => handleDeleteTier(tier)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                        <div className="tier-content">
                            {items[tier]?.items?.map((item, index) => (
                                <div key={items[tier].name} className="item">
                                    {item.name}
                                    {item.image && (
                                        <img
                                            className="item-image"
                                            src={item.image}
                                            alt={item.name}
                                        />
                                    )}
                                    <span className="item-actions">
                                        <button
                                            onClick={() =>
                                                moveItem(
                                                    tier,
                                                    "Unranked",
                                                    index
                                                )
                                            }
                                        >
                                            Move to Unranked
                                        </button>
                                        <button
                                            onClick={() =>
                                                removeItem(tier, index)
                                            }
                                        >
                                            Remove
                                        </button>
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

            {showEditDialog && (
                <div className="edit-dialog">
                    <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        placeholder="Enter new name"
                    />
                    <input
                        type="color"
                        value={editColor}
                        onChange={(e) => setEditColor(e.target.value)}
                    />
                    <span className="flex gap-3">
                        <button className="primary" onClick={handleSaveEdit}>
                            Save
                        </button>
                        <button
                            className="destructive"
                            onClick={() => setShowEditDialog(false)}
                        >
                            Cancel
                        </button>
                    </span>
                </div>
            )}
            <UnrankedContainer
                items={items.Unranked.items}
                moveItem={moveItem}
                removeItem={removeItem}
                tiers={Object.keys(items).filter((tier) => tier !== "Unranked")}
            />
            <div className="flex flex-col mt-5">
                <span className="flex gap-3">
                    <AddItemButton
                        type="text"
                        onClick={addTextItem}
                        hidden={showImageDialog || showTextDialog}
                    />
                    <AddItemButton
                        type="image"
                        onClick={addImageItem}
                        hidden={showTextDialog || showImageDialog}
                    />
                </span>
                {showTextDialog && (
                    <AddItemDialog
                        type="text"
                        value={newItemName}
                        onChange={(e) => setNewItemName(e.target.value)}
                        onAdd={handleAddTextItem}
                        onCancel={() => setShowTextDialog(false)}
                    />
                )}
                {showImageDialog && (
                    <AddItemDialog
                        type="image"
                        value={newItemImage}
                        onChange={(e) => setNewItemImage(e.target.value)}
                        onAdd={handleAddImageItem}
                        onCancel={() => setShowImageDialog(false)}
                    />
                )}
            </div>
        </div>
    );
}
