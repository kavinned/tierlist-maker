"use client";

import { useState } from "react";
import UnrankedContainer from "./UnrankedContainer";
import AddItemButton from "./AddItemButton";
import AddItemDialog from "./AddItemDialog";
import TierListName from "./TierListName";
import Tiers from "./Tiers";
import EditTierDialog from "./EditTierDialog";
import SaveListButton from "./SaveListButton";
import { useParams, useRouter } from "next/navigation";
import { saveTierList } from "../(utils)/utils";

export default function TierList({ initialItems, recordId }) {
    const [isEditingName, setIsEditingName] = useState(false);
    const [tierListName, setTierListName] = useState("Tier List");
    const [items, setItems] = useState(
        initialItems || {
            Unranked: { name: "Unranked", color: "#323638", items: [] },
            S: { name: "S", color: "#323638", items: [] },
            A: { name: "A", color: "#323638", items: [] },
            B: { name: "B", color: "#323638", items: [] },
        }
    );
    const [showTextDialog, setShowTextDialog] = useState(false);
    const [showImageDialog, setShowImageDialog] = useState(false);
    const [newItemName, setNewItemName] = useState("");
    const [newItemImage, setNewItemImage] = useState("");
    const [showEditDialog, setShowEditDialog] = useState(false);
    const [editTier, setEditTier] = useState(null);
    const [editName, setEditName] = useState("");
    const [editColor, setEditColor] = useState("");
    const router = useRouter();
    const { id } = useParams();

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

    const handleSaveList = async () => {
        const uniqueId = id || Date.now();

        try {
            const record = await saveTierList(
                items,
                tierListName,
                id,
                recordId
            );
            console.log("Saved to Airtable:", record);
            router.push(`/${uniqueId}`);
            localStorage.setItem(uniqueId, JSON.stringify(items));
        } catch (error) {
            console.error("Error saving tier list:", error);
        }
    };

    return (
        <div className="w-full min-h-screen flex flex-col justify-center items-center p-7">
            <TierListName
                isEditingName={isEditingName}
                toggleEditName={toggleEditName}
                handleEditName={handleEditName}
                tierListName={tierListName}
                setTierListName={setTierListName}
            />
            <Tiers
                items={items}
                handleEditTier={handleEditTier}
                handleDeleteTier={handleDeleteTier}
                moveItem={moveItem}
                removeItem={removeItem}
            />

            {showEditDialog && (
                <EditTierDialog
                    editName={editName}
                    setEditName={setEditName}
                    editColor={editColor}
                    setEditColor={setEditColor}
                    handleSaveEdit={handleSaveEdit}
                    setShowEditDialog={setShowEditDialog}
                />
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
            <SaveListButton handleSaveList={handleSaveList} />
        </div>
    );
}
