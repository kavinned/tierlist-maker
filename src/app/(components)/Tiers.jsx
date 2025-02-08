import Item from "./Item";

export default function Tiers() {
    return (
        <div className="flex h-auto w-[85%] border border-white mt-5 rounded-xl">
            <div className="min-w-32 w-auto bg-neutral-900 grid place-items-center rounded-tl-xl rounded-bl-xl">
                <p>S-rank</p>
            </div>
            <div className="flex-1 flex flex-row flex-wrap bg-slate-900 min-h-32 rounded-tr-xl rounded-br-xl gap-2 p-3">
                <Item />
            </div>
        </div>
    );
}
