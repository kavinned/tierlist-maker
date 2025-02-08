export default function TierListName({
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
                    <button
                        onClick={toggleEditName}
                        className="tertiary"
                        type="button"
                    >
                        Edit
                    </button>
                </>
            ) : (
                <>
                    <input
                        type="text"
                        value={tierListName}
                        onChange={(e) => setTierListName(e.target.value)}
                        className="text-3xl font-bold text-center m-4 bg-transparent border border-white rounded-md"
                    />
                    <button
                        onClick={handleEditName}
                        className="primary"
                        type="button"
                    >
                        Save
                    </button>
                </>
            )}
        </div>
    );
}
