import TierHeader from "./TierHeader";
import TierItem from "./TierItem";

export default function Tiers({
    items,
    handleEditTier,
    handleDeleteTier,
    moveItem,
    removeItem,
}) {
    return (
        <>
            {Object.keys(items)
                .filter((tier) => tier !== "Unranked")
                .map((tier) => (
                    <div className="tier" key={items[tier].name}>
                        <TierHeader
                            items={items}
                            tier={tier}
                            handleEditTier={handleEditTier}
                            handleDeleteTier={handleDeleteTier}
                        />
                        <div className="tier-content">
                            {items[tier]?.items?.map((item, index) => (
                                <TierItem
                                    key={index}
                                    items={items}
                                    item={item}
                                    tier={tier}
                                    index={index}
                                    moveItem={moveItem}
                                    removeItem={removeItem}
                                />
                            ))}
                        </div>
                    </div>
                ))}
        </>
    );
}
