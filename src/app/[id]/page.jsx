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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const localData = localStorage.getItem(id);

                if (localData) {
                    const parsedData = JSON.parse(localData);
                    setSavedData((prev) => ({
                        items: parsedData,
                        ...prev,
                    }));
                    return;
                }

                const record = await getRecordById(id);
                const items = JSON.parse(record.fields.items);
                localStorage.setItem(id, record.fields.items);
                setSavedData({
                    items,
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
            <div className="text-center mt-10 flex w-screen justify-center items-center md:h-fit h-screen">
                <p className="text-3xl font-bold">{error}</p>
                <Link className="underline text-blue-500" href="/">
                    Go back
                </Link>
            </div>
        );
    }

    if (!savedData) {
        return (
            <div className="text-center mt-10 flex w-screen justify-center items-center md:h-fit h-screen">
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
