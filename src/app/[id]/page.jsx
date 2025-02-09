"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import TierList from "../(components)/TierList";
import Link from "next/link";
import { getRecordById } from "../(utils)/utils";

export default function Page() {
    const { id } = useParams();
    const [savedData, setSavedData] = useState(null);
    const [error, setError] = useState(null);
    const uniqueId = id.split("_")[0];
    const recId = id.split("_")[1];

    useEffect(() => {
        const fetchData = async () => {
            if (!recId) {
                setError("Record not found. Likely error with URL");
                throw new Error("Record not found. Likely error with URL");
            }
            try {
                const localData = localStorage.getItem(uniqueId);

                if (localData) {
                    const parsedData = JSON.parse(localData);
                    setSavedData((prev) => ({
                        items: parsedData,
                        ...prev,
                    }));
                    return;
                }
                const record = await getRecordById(uniqueId);
                const items = JSON.parse(record.fields.items);
                let transformedItems = { ...items };
                for (const tier in transformedItems) {
                    if (tier !== "Unranked") {
                        transformedItems["Unranked"].items.push(
                            ...transformedItems[tier].items
                        );
                        transformedItems[tier].items = [];
                    }
                }
                localStorage.setItem(
                    uniqueId,
                    JSON.stringify(transformedItems)
                );
                setSavedData({
                    items: transformedItems,
                    recordId: record.id,
                });
            } catch (error) {
                setError(error.message);
                console.error(error);
            }
        };

        fetchData();
    }, [id]);

    if (error) {
        return (
            <div className="grid place-items-center h-screen">
                <span className="w-full text-center">
                    <p className="text-3xl font-bold">{error}</p>
                    <Link className="underline text-blue-500" href="/">
                        Go back
                    </Link>
                </span>
            </div>
        );
    }

    if (!savedData) {
        return (
            <div className="grid place-items-center h-screen">
                <p className="text-3xl font-bold">Loading...</p>
            </div>
        );
    }

    return (
        <TierList
            initialItems={savedData.items}
            recordId={savedData.recordId}
        />
    );
}
