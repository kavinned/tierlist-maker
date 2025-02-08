export default function SaveListButton({ handleSaveList }) {
    return (
        <button
            className="primary fixed bottom-5 right-5"
            type="button"
            onClick={handleSaveList}
        >
            Save List
        </button>
    );
}
