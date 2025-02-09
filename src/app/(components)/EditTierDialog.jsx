import * as motion from "framer-motion/client";

export default function EditTierDialog({
    editName,
    setEditName,
    editColor,
    setEditColor,
    handleSaveEdit,
    setShowEditDialog,
}) {
    return (
        <motion.div
            initial={{ opacity: 0, top: "30%" }}
            animate={{ opacity: 1, top: "50%" }}
            exit={{ opacity: 0, top: "80%" }}
            className="edit-dialog"
        >
            <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                placeholder="Enter new name"
            />
            <input
                type="color"
                value={editColor}
                onChange={(e) => setEditColor(e.target.value)}
                className="w-10 h-10"
            />
            <span className="flex gap-3">
                <button className="primary" onClick={handleSaveEdit}>
                    Save
                </button>
                <button
                    className="destructive"
                    onClick={() => setShowEditDialog(false)}
                >
                    Cancel
                </button>
            </span>
        </motion.div>
    );
}
