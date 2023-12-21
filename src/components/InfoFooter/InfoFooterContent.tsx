import { useMapContext } from "../../contexts/MapContext";
import { useDataContext } from "../../contexts/DataContext";
import { Link } from "react-router-dom";
import { FaMapSigns } from "react-icons/fa";
import { IoStatsChartSharp } from "react-icons/io5";
import { GiHammerSickle } from "react-icons/gi";

export default function InfoFooterContent() {
    const { session, rounds } = useMapContext();
    const { score, distance, roundState, startNewRound, status } =
        useDataContext();
    const isLast: boolean = rounds.length === session?.numOfRounds;

    return (
        <>
            {distance !== null && score !== null && (
                <div className="flex flex-col items-center gap-3">
                    <div>You didn't even try! </div>
                    <div className="flex flex-col items-center gap-3 md:flex-row">
                        {roundState === "LATE" && (
                            <div>Late... zero points!</div>
                        )}
                        {roundState === "NO_ANSWER" && (
                            <div className="">
                                <div className="stat">
                                    <div className="stat-figure text-error">
                                        <GiHammerSickle size={40} />
                                    </div>
                                    <div className="stat-title">
                                        So I sent you to
                                    </div>
                                    <div className="stat-value text-error">
                                        Siberia
                                    </div>
                                    <div className="stat-desc">
                                        just beacuse I can.
                                    </div>
                                    <span className="font-semibold text-center">
                                        (0 points)
                                    </span>
                                </div>
                            </div>
                        )}
                        {roundState === "ON_TIME" && (
                            <div className="stat px-0">
                                <div className="stat-title">
                                    {distance} km from exact location
                                </div>
                                <div className="stat-value text-primary">
                                    {score} POINTS
                                </div>
                                <div className="stat-desc">
                                    Of 5000 points max
                                </div>
                            </div>
                        )}
                    </div>

                    {isLast ? (
                        <Link
                            to="/results"
                            className="btn btn-primary w-full md:w-40"
                        >
                            <IoStatsChartSharp />
                            <span>See results!</span>
                        </Link>
                    ) : (
                        <button
                            className="btn btn-secondary w-full md:w-40"
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
        </>
    );
}
