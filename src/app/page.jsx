import TierList from "./(components)/TierList";

export default function Home() {
    return (
        <div className="max-w-screen max-h-screen flex flex-col items-center relative">
            <h1 className="text-3xl font-bold text-center m-4">
                Tier List Maker
            </h1>
            <TierList />
        </div>
    );
}
