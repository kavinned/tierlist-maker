export default function CreateTierButton({ handleCreateTier, hidden }) {
    return (
        <button
            className={`tertiary action-buttons order-2 ${
                hidden ? "hidden" : ""
            }`}
            type="button"
            onClick={handleCreateTier}
        >
            Add Tier
        </button>
    );
}
