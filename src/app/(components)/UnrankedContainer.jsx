import { Droppable } from "@hello-pangea/dnd";
import TierItem from "./TierItem";

export default function UnrankedContainer({ items, removeItem }) {
    return (
        <div className="w-[85%] min-h-32 h-auto border border-white mt-5 unranked">
            <div className="tier-header">
                <p>Unranked</p>
            </div>
            <Droppable droppableId="Unranked">
                {(provided) => (
                    <div
                        className="tier-content"
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {items.map((item, index) => (
                            <TierItem
                                key={item.id || `unranked-${index}`}
                                item={item}
                                index={index}
                                tier="Unranked"
                                removeItem={removeItem}
                            />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
}
