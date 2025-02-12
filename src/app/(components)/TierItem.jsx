import { Draggable } from "@hello-pangea/dnd";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { XCircleIcon } from "lucide-react";
import Overlay from "./Overlay";
import * as motion from "framer-motion/client";

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
                            <motion.img
                                className="item-image z-0"
                                loading="lazy"
                                src={item.image}
                                alt={item.name}
                                onClick={() => handleImageClick(item.image)}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.3,
                                    delay: 0.1,
                                    type: "tween",
                                }}
                                variants={{
                                    visible: { opacity: 1, scale: 1 },
                                    hidden: { opacity: 0.85, scale: 0.95 },
                                }}
                            />
                        )}
                        <div className="spinner-small -z-10"></div>
                        <button
                            className="item-delete z-20"
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
                    <Overlay onClick={handleCloseImage}>
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
                    </Overlay>
                )}
            </AnimatePresence>
        </>
    );
}
