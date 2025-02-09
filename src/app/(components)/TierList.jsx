"use client";

import { useEffect, useState } from "react";
import UnrankedContainer from "./UnrankedContainer";
import AddItemButton from "./AddItemButton";
import AddItemDialog from "./AddItemDialog";
import Tiers from "./Tiers";
import EditTierDialog from "./EditTierDialog";
import SaveListButton from "./SaveListButton";
import { useParams, usePathname, useRouter } from "next/navigation";
import { saveTierList } from "../(utils)/utils";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import Link from "next/link";
import { DragDropContext } from "@hello-pangea/dnd";
import TierListHeader from "./TierListHeader";
import CreateTierButton from "./CreateTierButton";
import Loader from "./Loader";
import CopyLink from "./CopyLink";

export default function TierList({ initialItems, recordId }) {
    const [isEditingName, setIsEditingName] = useState(false);
    const [tierListName, setTierListName] = useState("Tier List");
    const [items, setItems] = useState(
        initialItems || {
            Unranked: { name: "Unranked", color: "#323638", items: [] },
            0: { name: "Tier 1", color: "#323638", items: [] },
            1: { name: "Tier 2", color: "#323638", items: [] },
            2: { name: "Tier 3", color: "#323638", items: [] },
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
    const [successMsg, setSuccessMsg] = useState("");
    const [loading, setLoading] = useState(false);
    const [url, setUrl] = useState("");
    const path = usePathname();
    const router = useRouter();
    const { id } = useParams();
    const uniqueId = id ? id.split("_")[0] : Date.now().toString();
    const recId = recordId || (id ? id.split("_")[1] : null);

    useEffect(() => {
        setUrl(window.location.href);
    }, []);

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
            setLoading(true);
            const records = await saveTierList(
                items,
                tierListName,
                uniqueId,
                recId
            );

            localStorage.setItem(uniqueId, JSON.stringify(items));
            setLoading(false);
            setSuccessMsg("Tier list saved successfully!");
            const timer = setTimeout(() => setSuccessMsg(""), 3000);

            if (!id) router.push(`/${uniqueId}_${records.recordId}`);

            return () => clearTimeout(timer);
        } catch (error) {
            console.error("Error saving tier list:", error);
        }
    };

    const handleCreateTier = () => {
        const length = Object.keys(items).length;

        setItems((prevItems) => ({
            ...prevItems,
            [length]: {
                name: `Tier ${Number(length)}`,
                color: "#323638",
                items: [],
            },
        }));
    };

    const handleResetList = () => {
        localStorage.removeItem(uniqueId);
        window.location.reload();
    };

    const handleDragEnd = (result) => {
        const { source, destination } = result;

        if (!destination) return;

        if (
            source.droppableId === destination.droppableId &&
            source.index === destination.index
        ) {
            return;
        }

        const sourceId = source.droppableId;
        const destId = destination.droppableId;

        setItems((prevItems) => {
            const sourceItems = [...prevItems[sourceId].items];
            const destItems =
                sourceId === destId
                    ? sourceItems
                    : [...prevItems[destId].items];

            const [removed] = sourceItems.splice(source.index, 1);
            destItems.splice(destination.index, 0, removed);

            const newItems = {
                ...prevItems,
                [sourceId]: {
                    ...prevItems[sourceId],
                    items: sourceItems,
                },
            };

            if (sourceId !== destId) {
                newItems[destId] = {
                    ...prevItems[destId],
                    items: destItems,
                };
            }

            return newItems;
        });
    };

    const handleCopyToClipboard = () => {
        navigator.clipboard.writeText(url);
        setSuccessMsg("Link copied to clipboard!");
        const timer = setTimeout(() => setSuccessMsg(""), 3000);
        return () => clearTimeout(timer);
    };

    return (
        <>
            {loading && <Loader />}
            <DragDropContext onDragEnd={handleDragEnd}>
                <div className="w-full min-h-screen flex flex-col justify-center items-center p-7">
                    <TierListHeader
                        isEditingName={isEditingName}
                        toggleEditName={toggleEditName}
                        handleEditName={handleEditName}
                        tierListName={tierListName}
                        setTierListName={setTierListName}
                        handleCreateTier={handleCreateTier}
                    />
                    <AnimatePresence href="">
                        {recId && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <CopyLink
                                    url={url}
                                    handleCopyToClipboard={
                                        handleCopyToClipboard
                                    }
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <Tiers
                        items={items}
                        handleEditTier={handleEditTier}
                        handleDeleteTier={handleDeleteTier}
                        removeItem={removeItem}
                    />
                    <AnimatePresence>
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
                    </AnimatePresence>
                    <UnrankedContainer
                        items={items.Unranked.items}
                        removeItem={removeItem}
                        tiers={Object.keys(items).filter(
                            (tier) => tier !== "Unranked"
                        )}
                    />
                    <div className="flex flex-col mt-5">
                        <span className="flex gap-3">
                            <CreateTierButton
                                handleCreateTier={handleCreateTier}
                                hidden={showTextDialog || showImageDialog}
                            />
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
                            <SaveListButton
                                handleSaveList={handleSaveList}
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
                                onChange={(e) =>
                                    setNewItemImage(e.target.value)
                                }
                                onAdd={handleAddImageItem}
                                onCancel={() => setShowImageDialog(false)}
                            />
                        )}
                    </div>
                    <AnimatePresence>
                        {successMsg !== "" && (
                            <motion.div
                                className="fixed top-10 bg-emerald-700 px-5 py-3 rounded-xl border-2 border-white"
                                initial={{ opacity: 0, y: -200 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -200 }}
                                transition={{ duration: 0.3 }}
                            >
                                <p>{successMsg}</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    {path !== "/" && (
                        <span className="flex gap-3">
                            <Link
                                className={`flex items-center text-md bg-lime-700 hover:brightness-[1.2] px-2 py-1 rounded transition-all duration-100 ease-in-out ${
                                    showImageDialog || showTextDialog
                                        ? "hidden"
                                        : ""
                                }`}
                                href="/"
                            >
                                New List
                            </Link>
                            <button
                                className={`flex items-center text-md bg-cyan-800 hover:brightness-[1.2] px-2 py-1 rounded transition-all duration-100 ease-in-out ${
                                    showImageDialog || showTextDialog
                                        ? "hidden"
                                        : ""
                                }`}
                                onClick={() => handleResetList()}
                            >
                                Reset
                            </button>
                        </span>
                    )}
                </div>
            </DragDropContext>
        </>
    );
}
