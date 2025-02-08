import Tiers from "./(components)/Tiers";
import UnrankedContainer from "./(components)/UnrankedContainer";

export default function page() {
    return (
        <div className="h-screen max-w-screen flex items-center flex-col">
            <Tiers />
            <Tiers />
            <Tiers />
            <Tiers />
            <UnrankedContainer />
        </div>
    );
}
