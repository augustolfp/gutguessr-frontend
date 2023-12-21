import { useMapContext } from "../../contexts/MapContext";
import { useDataContext } from "../../contexts/DataContext";
import { Link } from "react-router-dom";
import { FaMapSigns } from "react-icons/fa";
import { IoStatsChartSharp } from "react-icons/io5";
import { GiHammerSickle } from "react-icons/gi";

export default function InfoFooter() {
    const { session, rounds } = useMapContext();
    const { score, distance, roundState, startNewRound, status } =
        useDataContext();
    const isLast: boolean = rounds.length === session?.numOfRounds;

    let infoFooterStyle: string =
        status === "SUCCESS"
            ? "flex items-center justify-center gap-2 h-3/6 transition-all"
            : "flex items-center justify-center gap-2 h-1/6 transition-all";

    return (
        <div className={`${infoFooterStyle}`}>
            {distance !== null && score !== null && (
                <div className="flex items-center gap-3">
                    <div className="stats shadow">
                        {roundState === "LATE" && (
                            <div>Late... zero points!</div>
                        )}
                        {roundState === "NO_ANSWER" && (
                            <div>
                                <div className="stat">
                                    <div className="stat-figure text-primary">
                                        <GiHammerSickle />
                                    </div>
                                    <div className="stat-title text-xs md:text-base">
                                        You didn't even try! So I sent you to
                                    </div>
                                    <div className="stat-value text-primary text-xl">
                                        Siberia
                                    </div>
                                    <div className="stat-desc">
                                        just beacuse I can
                                    </div>
                                </div>
                            </div>
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
