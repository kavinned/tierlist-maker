export default function SaveListButton({ handleSaveList, hidden }) {
    return (
        <button
            className={`primary order-3 action-buttons ${
                hidden ? "hidden" : ""
            }`}
            type="button"
            onClick={handleSaveList}
        >
            Save List
        </button>
    );
}
