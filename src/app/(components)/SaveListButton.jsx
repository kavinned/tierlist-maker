export default function SaveListButton({ handleSaveList }) {
    return (
        <button
            className="primary fixed bottom-5 right-5 opacity-60 hover:opacity-100 transition-opacity"
            type="button"
            onClick={handleSaveList}
        >
            Save List
        </button>
    );
}
