"use client";

import { useState } from "react";

export default function UnrankedContainer({ items, moveItem, removeItem }) {
    const [expandedImage, setExpandedImage] = useState(null);

    const handleImageClick = (image) => {
        setExpandedImage(image);
    };

    const handleCloseImage = () => {
        setExpandedImage(null);
    };

    return (
        <div className="w-[85%] min-h-32 h-auto border border-white mt-5">
            <div className="tier-header">
                <p>Unranked</p>
            </div>
            <div className="tier-content">
                {items.map((item, index) => (
                    <div key={index} className="item">
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
                            onClick={() => moveItem("Unranked", "S", index)}
                        >
                            Move to S
                        </button>
                        <button
                            onClick={() => moveItem("Unranked", "A", index)}
                        >
                            Move to A
                        </button>
                        <button
                            onClick={() => moveItem("Unranked", "B", index)}
                        >
                            Move to B
                        </button>
                        <button onClick={() => removeItem("Unranked", index)}>
                            Remove
                        </button>
                    </div>
                ))}
            </div>
            {expandedImage && (
                <div
                    className="expanded-image-overlay"
                    onClick={handleCloseImage}
                >
                    <img
                        src={expandedImage}
                        alt="Expanded"
                        className="expanded-image"
                    />
                </div>
            )}
        </div>
    );
}
