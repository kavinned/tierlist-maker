export default function SaveListButton({ handleSaveList, hidden }) {
    return (
        <button
            className={`primary md:mb-4 ${hidden ? "hidden" : ""}`}
            type="button"
            onClick={handleSaveList}
        >
            Save List
        </button>
    );
}
