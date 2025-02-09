"use client";

import { useState } from "react";
import UnrankedContainer from "./UnrankedContainer";
import AddItemButton from "./AddItemButton";
import AddItemDialog from "./AddItemDialog";
import TierListName from "./TierListName";
import Tiers from "./Tiers";
import EditTierDialog from "./EditTierDialog";
import SaveListButton from "./SaveListButton";
import { useParams, usePathname, useRouter } from "next/navigation";
import { saveTierList } from "../(utils)/utils";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import Link from "next/link";

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
    const [saveSuccess, setSaveSuccess] = useState(false);
    const path = usePathname();
    const router = useRouter();
    const { id } = useParams();
    const uniqueId = id ? id.split("_")[0] : Date.now().toString();
    const recId = recordId || (id ? id.split("_")[1] : null);

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
        try {
            const records = await saveTierList(
                items,
                tierListName,
                uniqueId,
                recId
            );

            localStorage.setItem(uniqueId, JSON.stringify(items));

            setSaveSuccess(true);
            const timer = setTimeout(() => setSaveSuccess(false), 3000);

            if (!id) router.push(`/${uniqueId}_${records.recordId}`);

            return () => clearTimeout(timer);
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
            <AnimatePresence>
                {saveSuccess && (
                    <motion.div
                        className="success-message fixed top-10 bg-emerald-500 p-5 rounded-xl"
                        initial={{ opacity: 0, y: -200 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -200 }}
                        transition={{ duration: 0.3 }}
                    >
                        <p>Tier List saved successfully</p>
                    </motion.div>
                )}
            </AnimatePresence>
            {path !== "/" && (
                <Link
                    className="fixed text-sm top-1 left-1 opacity-60 hover:opacity-100 transition-opacity bg-emerald-900 p-1 rounded"
                    href="/"
                >
                    New List
                </Link>
            )}
        </div>
    );
}
