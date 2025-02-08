export default function TierItem({
    items,
    item,
    tier,
    index,
    moveItem,
    removeItem,
}) {
    return (
        <div key={items[tier].name} className="item">
            {item.name}
            {item.image && (
                <img className="item-image" src={item.image} alt={item.name} />
            )}
            <span className="item-actions">
                <button onClick={() => moveItem(tier, "Unranked", index)}>
                    Move to Unranked
                </button>
                <button onClick={() => removeItem(tier, index)}>Remove</button>
            </span>
        </div>
    );
}
