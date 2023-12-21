import { useMapContext } from "../../contexts/MapContext";
import { useDataContext } from "../../contexts/DataContext";
import { Link } from "react-router-dom";
import { FaMapSigns } from "react-icons/fa";
import { IoStatsChartSharp } from "react-icons/io5";

export default function InfoFooter() {
    const { session, rounds } = useMapContext();
    const { score, distance, roundState, startNewRound } = useDataContext();
    const isLast: boolean = rounds.length === session?.numOfRounds;

    return (
        <div className="flex items-center justify-center gap-2 h-1/6">
            {distance !== null && score !== null && (
                <div className="flex items-center gap-3">
                    <div className="stats shadow">
                        {roundState === "LATE" && (
                            <div>Late... zero points!</div>
                        )}
                        {roundState === "NO_ANSWER" && (
                            <div>Gulag here we go!</div>
                        )}
                        {roundState === "ON_TIME" && (
                            <div className="stat px-0">
                                <div className="stat-title text-xs md:text-base">
                                    {distance} km from exact location
                                </div>
                                <div className="stat-value text-primary text-2xl md:text-4xl">
                                    {score} POINTS
                                </div>
                                <div className="stat-desc">
                                    Of 5000 points max
                                </div>
                            </div>
                        )}
                    </div>

                    {isLast ? (
                        <Link to="/results" className="btn btn-primary">
                            <IoStatsChartSharp />
                            <span>See results!</span>
                        </Link>
                    ) : (
                        <button
                            className="btn btn-secondary"
                            onClick={() => {
                                startNewRound();
                            }}
                        >
                            <FaMapSigns />
                            <span>Next round!</span>
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}
