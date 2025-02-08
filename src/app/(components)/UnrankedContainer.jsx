"use client";

import { useState } from "react";

export default function UnrankedContainer({
    items,
    moveItem,
    removeItem,
    tiers,
}) {
    const [expandedImage, setExpandedImage] = useState(null);

    const handleImageClick = (image) => {
        setExpandedImage(image);
    };

    const handleCloseImage = () => {
        setExpandedImage(null);
    };

    return (
        <div className="w-[85%] min-h-32 h-auto border border-white mt-5 unranked">
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
                        <span className="item-actions">
                            {tiers.map((tier) => (
                                <button
                                    key={tier}
                                    onClick={() =>
                                        moveItem("Unranked", tier, index)
                                    }
                                >
                                    Move to {tier}
                                </button>
                            ))}
                            <button
                                onClick={() => removeItem("Unranked", index)}
                            >
                                Remove
                            </button>
                        </span>
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
