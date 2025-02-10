import { Draggable } from "@hello-pangea/dnd";
import { useState } from "react";
import * as motion from "framer-motion/client";
import { AnimatePresence } from "framer-motion";
import { XCircleIcon } from "lucide-react";

export default function TierItem({ item, index, tier, removeItem }) {
    const [expandedImage, setExpandedImage] = useState(null);

    const handleImageClick = (image) => {
        setExpandedImage(image);
    };

    const handleCloseImage = () => {
        setExpandedImage(null);
    };

    return (
        <>
            <Draggable draggableId={`${tier}-${index}`} index={index}>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`item relative ${
                            snapshot.isDragging ? "dragging" : ""
                        }`}
                    >
                        {item.name && <p>{item.name}</p>}
                        {item.image && (
                            <img
                                className="item-image"
                                src={item.image}
                                alt={item.name}
                                onClick={() => handleImageClick(item.image)}
                            />
                        )}
                        <button
                            className="item-delete"
                            type="button"
                            onClick={() => removeItem(tier, index)}
                        >
                            <XCircleIcon
                                fill="red"
                                strokeWidth={2}
                                stroke="black"
                                className="opacity-50 hover:opacity-100 transition-opacity duration-150 ease-linear"
                            />
                        </button>
                    </div>
                )}
            </Draggable>
            <AnimatePresence>
                {expandedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="expanded-image-overlay"
                        onClick={handleCloseImage}
                    >
                        <div className="relative">
                            <img
                                src={expandedImage}
                                alt="Expanded"
                                className="expanded-image"
                            />
                            <p
                                className="item-delete__expanded"
                                onClick={() => removeItem(tier, index)}
                            >
                                DELETE
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
