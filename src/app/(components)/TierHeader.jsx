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
            <div className="flex gap-2 absolute bottom-3">
                <button
                    className="tier-header-button primary"
                    onClick={() => handleEditTier(tier)}
                >
                    Edit
                </button>
                <button
                    className="tier-header-button destructive"
                    onClick={() => handleDeleteTier(tier)}
                >
                    Delete
                </button>
            </div>
        </div>
    );
}
