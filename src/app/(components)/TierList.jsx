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
import Link from "next/link";
import { DragDropContext } from "@hello-pangea/dnd";
import TierListHeader from "./TierListHeader";
import CreateTierButton from "./CreateTierButton";
import Loader from "./Loader";
import CopyLink from "./CopyLink";
import SuccessMsg from "./SuccessMsg";

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
    const [msg, setMsg] = useState("");
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
        if (tierListName.trim() === "") {
            setMsg("Please enter a name.");
            const timer = setTimeout(() => setMsg(""), 3000);
            return () => clearTimeout(timer);
        }
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
        if (newItemName.trim() === "") {
            setMsg("Please enter some text.");
            const timer = setTimeout(() => setMsg(""), 3000);
            return () => clearTimeout(timer);
        }
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
        if (newItemImage.trim() === "") {
            setMsg("Please enter a URL.");
            const timer = setTimeout(() => setMsg(""), 3000);
            return () => clearTimeout(timer);
        }
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
        const confirmed = window.confirm(
            "Are you sure you want to remove this item?"
        );
        if (!confirmed) return;
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

        if (editName.trim() === "") {
            setMsg("Please enter a name for the tier.");
            const timer = setTimeout(() => setMsg(""), 3000);
            return () => clearTimeout(timer);
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
            setMsg("Tier list saved successfully!");
            const timer = setTimeout(() => setMsg(""), 3000);

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
        try {
            if (navigator.clipboard) {
                navigator.clipboard.writeText(url);
            } else {
                const textArea = document.createElement("textarea");
                textArea.value = url;
                textArea.style.position = "fixed";
                textArea.style.left = "-999999px";
                textArea.style.top = "-999999px";
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                try {
                    document.execCommand("copy");
                } catch (err) {
                    console.error("Failed to copy text:", err);
                }
                textArea.remove();
            }
            setMsg("Copied to clipboard!");
            const timer = setTimeout(() => setMsg(""), 3000);
            return () => clearTimeout(timer);
        } catch (error) {
            console.error("Error copying URL to clipboard:", error);
        }
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
                        <span className="md:flex grid grid-cols-2 gap-3">
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
                            {path !== "/" && (
                                <>
                                    <button
                                        className={`action-buttons order-4 bg-lime-700 ${
                                            showImageDialog || showTextDialog
                                                ? "hidden"
                                                : ""
                                        }`}
                                    >
                                        <Link href="/">New List</Link>
                                    </button>
                                    <button
                                        className={`action-buttons bg-cyan-800 order-5 ${
                                            showImageDialog || showTextDialog
                                                ? "hidden"
                                                : ""
                                        }`}
                                        onClick={() => handleResetList()}
                                    >
                                        Reset
                                    </button>
                                </>
                            )}
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
                    <SuccessMsg successMsg={msg} />

                    {recId && (
                        <CopyLink
                            handleCopyToClipboard={handleCopyToClipboard}
                        />
                    )}
                </div>
            </DragDropContext>
        </>
    );
}
