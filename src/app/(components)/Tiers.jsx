import TierHeader from "./TierHeader";
import TierItem from "./TierItem";
import { Droppable } from "@hello-pangea/dnd";

export default function Tiers({
    items,
    handleEditTier,
    handleDeleteTier,
    removeItem,
}) {
    return (
        <>
            {Object.keys(items)
                .filter((tier) => tier !== "Unranked")
                .map((tier) => (
                    <div className="tier" key={tier}>
                        <TierHeader
                            items={items}
                            tier={tier}
                            handleEditTier={handleEditTier}
                            handleDeleteTier={handleDeleteTier}
                        />
                        <Droppable droppableId={tier}>
                            {(provided) => (
                                <div
                                    className="tier-content"
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    {items[tier]?.items?.map((item, index) => (
                                        <TierItem
                                            key={item.id || index}
                                            item={item}
                                            index={index}
                                            tier={tier}
                                            removeItem={removeItem}
                                        />
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </div>
                ))}
        </>
    );
}