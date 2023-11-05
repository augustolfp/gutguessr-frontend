import { useAppContext } from "../../contexts/AppContext";

export default function InfoFooter() {
    const { nextRound, distance, submit } = useAppContext();

    return (
        <div className="px-6 flex items-center gap-2 h-1/6">
            <button className="btn btn-secondary" onClick={nextRound}>
                Next round!
            </button>
            {distance && (
                <div>
                    <span className="font-semibold">Distance: </span>
                    {distance}
                </div>
            )}
            <button className="btn btn-primary" onClick={submit}>
                Submit
            </button>
        </div>
    );
}
