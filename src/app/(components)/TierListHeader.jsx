import { SaveIcon } from "lucide-react";
import { Edit } from "lucide-react";

export default function TierListHeader({
    isEditingName,
    toggleEditName,
    handleEditName,
    tierListName,
    setTierListName,
}) {
    return (
        <div className="w-[85vw] h-16 bg-[#4b5154] flex items-center justify-center rounded-xl">
            {!isEditingName ? (
                <>
                    <h1 className="text-3xl font-bold text-center m-4">
                        {tierListName}
                    </h1>
                    <Edit
                        className="cursor-pointer w-10 h-10 hover:scale-110 transition-all duration-200 hover:fill-[rgba(128,128,128,0.7)]"
                        onClick={toggleEditName}
                    />
                </>
            ) : (
                <>
                    <input
                        type="text"
                        value={tierListName}
                        onChange={(e) => setTierListName(e.target.value)}
                        className="text-3xl font-bold text-center m-4 bg-transparent border border-white rounded-md w-3/4"
                    />
                    <SaveIcon
                        className="w-10 h-10 cursor-pointer hover:scale-110 transition-all duration-200 hover:fill-[rgba(36,36,255,0.7)]"
                        onClick={handleEditName}
                    />
                </>
            )}
        </div>
    );
}
