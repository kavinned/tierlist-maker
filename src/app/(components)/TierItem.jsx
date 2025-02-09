import { Draggable } from "@hello-pangea/dnd";
import { useState } from "react";
import * as motion from "framer-motion/client";
import { AnimatePresence } from "framer-motion";

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
                {(provided) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="item relative"
                    >
                        {item.name}
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
                            ×
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
                        <img
                            src={expandedImage}
                            alt="Expanded"
                            className="expanded-image"
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
