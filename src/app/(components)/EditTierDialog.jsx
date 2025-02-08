export default function EditTierDialog({
    editName,
    setEditName,
    editColor,
    setEditColor,
    handleSaveEdit,
    setShowEditDialog,
}) {
    return (
        <div className="edit-dialog">
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
        </div>
    );
}
