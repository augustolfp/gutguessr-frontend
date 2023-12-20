import { useMapContext } from "../../contexts/MapContext";
import { useDataContext } from "../../contexts/DataContext";
import { Link } from "react-router-dom";

export default function InfoFooter() {
    const { requestNewRound, session, rounds } = useMapContext();
    const { score, distance, isLate, clearData } = useDataContext();
    const isLast: boolean = rounds.length === session?.numOfRounds;

    return (
        <div className="px-6 flex items-center justify-center gap-2 h-1/6">
            {distance !== null && score !== null && (
                <div className="flex items-center">
                    <div className="stats shadow">
                        {isLate ? (
                            <div>Late... zero points!</div>
                        ) : (
                            <div className="stat">
                                <div className="stat-title">
                                    {distance} km from exact location
                                </div>
                                <div className="stat-value">{score} POINTS</div>
                                <div className="stat-desc">
                                    Of 5000 points max
                                </div>
                            </div>
                        )}
                    </div>

                    {isLast ? (
                        <Link to="/results" className="btn btn-secondary">
                            See results!
                        </Link>
                    ) : (
                        <button
                            className="btn btn-secondary"
                            onClick={() => {
                                clearData();
                                requestNewRound();
                            }}
                        >
                            Next round!
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}
