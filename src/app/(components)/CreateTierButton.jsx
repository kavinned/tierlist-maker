export default function CreateTierButton({ handleCreateTier, hidden }) {
    return (
        <button
            className={`tertiary md:mb-4 ${hidden ? "hidden" : ""}`}
            type="button"
            onClick={handleCreateTier}
        >
            Add Tier
        </button>
    );
}
