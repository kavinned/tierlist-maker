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
            <div className="flex absolute bottom-3 h-fit rounded-full overflow-hidden">
                <button
                    className="tier-header-button"
                    onClick={() => handleEditTier(tier)}
                >
                    <Edit2Icon
                        className="fill-sky-500 hover:scale-125 hover:fill-sky-700 transition-all duration-200 stroke-black"
                        size={15}
                    />
                </button>
                <button
                    className="tier-header-button"
                    onClick={() => handleDeleteTier(tier)}
                >
                    <Trash
                        className="fill-red-500 hover:scale-125 hover:fill-red-700 transition-all duration-200 stroke-black"
                        size={15}
                    />
                </button>
            </div>
        </div>
    );
}
