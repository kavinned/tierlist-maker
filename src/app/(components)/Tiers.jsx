import Item from "./Item";

export default function Tiers() {
    return (
        <div className="container">
            <div className="tier">
                <div className="tier-header">
                    <p>S-rank</p>
                </div>
                <div className="tier-content">
                    <Item />
                </div>
            </div>
            <div className="tier">
                <div className="tier-header">
                    <p>A-rank</p>
                </div>
                <div className="tier-content">
                    <Item />
                </div>
            </div>
            <div className="tier">
                <div className="tier-header">
                    <p>B-rank</p>
                </div>
                <div className="tier-content">
                    <Item />
                </div>
            </div>
        </div>
    );
}
