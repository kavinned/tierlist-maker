"use client";

import { useState } from "react";
import UnrankedContainer from "./UnrankedContainer";
import AddItemButton from "./AddItemButton";
import AddItemDialog from "./AddItemDialog";

export default function TierList() {
    const [items, setItems] = useState({
        Unranked: [],
        S: [],
        A: [],
        B: [],
    });
    const [showTextDialog, setShowTextDialog] = useState(false);
    const [showImageDialog, setShowImageDialog] = useState(false);
    const [newItemName, setNewItemName] = useState("");
    const [newItemImage, setNewItemImage] = useState("");

    const addTextItem = () => {
        setShowTextDialog(true);
    };

    const addImageItem = () => {
        setShowImageDialog(true);
    };

    const handleAddTextItem = () => {
        setItems((prevItems) => ({
            ...prevItems,
            Unranked: [...prevItems.Unranked, { name: newItemName, image: "" }],
        }));
        setShowTextDialog(false);
        setNewItemName("");
    };

    const handleAddImageItem = () => {
        setItems((prevItems) => ({
            ...prevItems,
            Unranked: [
                ...prevItems.Unranked,
                { name: "", image: newItemImage },
            ],
        }));
        setShowImageDialog(false);
        setNewItemImage("");
    };

    const moveItem = (fromTier, toTier, index) => {
        setItems((prevItems) => {
            const item = prevItems[fromTier][index];
            const newFromTier = prevItems[fromTier].filter(
                (_, i) => i !== index
            );
            const newToTier = [...prevItems[toTier], item];
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
            [tier]: prevItems[tier].filter((_, i) => i !== index),
        }));
    };

    return (
        <div className="container">
            {Object.keys(items)
                .filter((tier) => tier !== "Unranked")
                .map((tier) => (
                    <div className="tier" key={tier}>
                        <div className="tier-header">
                            <p>{tier}-rank</p>
                        </div>
                        <div className="tier-content">
                            {items[tier].map((item, index) => (
                                <div key={index} className="item">
                                    {item.name}
                                    {item.image && (
                                        <img
                                            className="item-image"
                                            src={item.image}
                                            alt={item.name}
                                        />
                                    )}
                                    <button
                                        onClick={() =>
                                            moveItem(tier, "Unranked", index)
                                        }
                                    >
                                        Move to Unranked
                                    </button>
                                    <button
                                        onClick={() => removeItem(tier, index)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            <AddItemButton
                type="text"
                onClick={addTextItem}
                hidden={showImageDialog}
            />
            <AddItemButton
                type="image"
                onClick={addImageItem}
                hidden={showTextDialog}
            />
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
            <UnrankedContainer
                items={items.Unranked}
                moveItem={moveItem}
                removeItem={removeItem}
            />
        </div>
    );
}
