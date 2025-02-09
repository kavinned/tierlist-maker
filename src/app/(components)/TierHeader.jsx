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
            <div className="flex gap-2 absolute bottom-3 justify-evenly w-full">
                <Edit2Icon
                    className="tier-header-button w-6 h-6 hover:scale-x-[-1] fill-sky-500 hover:scale-110 hover:fill-sky-700 transition-all duration-200"
                    onClick={() => handleEditTier(tier)}
                />
                <Trash
                    className="tier-header-button w-6 h-6 hover:scale-x-[-1] cursor-pointer fill-red-500 hover:scale-110 hover:fill-red-700 transition-all duration-200"
                    onClick={() => handleDeleteTier(tier)}
                />
            </div>
        </div>
    );
}
