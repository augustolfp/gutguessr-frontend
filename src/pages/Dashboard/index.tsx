import { useAppContext } from "../../contexts/AppContext";

export default function Dashboard() {
    const { round, nextRound, submit, distance, map, userMarker, panorama } =
        useAppContext();

    return (
        <div>
            <div id="panorama" className="w-48 h-48"></div>
            <div id="map" className="w-48 h-48"></div>
            <button className="btn btn-primary" onClick={submit}>
                Submit guess
            </button>
            <button className="btn btn-secondary" onClick={nextRound}>
                Skip/Next
            </button>
            {distance && (
                <div>
                    <span className="font-semibold">Distance: </span>
                    {distance}
                </div>
            )}
            <div>
                <span className="font-semibold">Round:</span>
                {round}
            </div>
        </div>
    );
}
