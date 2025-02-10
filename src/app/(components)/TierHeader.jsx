import { Trash } from "lucide-react";
import { Edit2Icon } from "lucide-react";

export default function TierHeader({
    items,
    tier,
    handleEditTier,
    handleDeleteTier,
}) {
    return (
        <div
            className="tier-header relative"
            style={{ backgroundColor: items[tier].color }}
        >
            <p>{items[tier].name}</p>
            <div className="flex md:flex-row flex-col gap-2 absolute md:bottom-3 md:justify-evenly justify-end h-full md:h-fit">
                <button className="tier-header-button">
                    <Edit2Icon
                        className="fill-sky-500 hover:scale-125 hover:fill-sky-700 transition-all duration-200 stroke-black"
                        onClick={() => handleEditTier(tier)}
                    />
                </button>
                <button className="tier-header-button">
                    <Trash
                        className="fill-red-500 hover:scale-125 hover:fill-red-700 transition-all duration-200 stroke-black"
                        onClick={() => handleDeleteTier(tier)}
                    />
                </button>
            </div>
        </div>
    );
}
