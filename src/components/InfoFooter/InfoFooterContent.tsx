import { useMapContext } from "../../contexts/MapContext";
import { useDataContext } from "../../contexts/DataContext";
import { Link } from "react-router-dom";
import { FaMapSigns } from "react-icons/fa";
import { IoStatsChartSharp } from "react-icons/io5";
import NoAnswerResponse from "./NoAnswerResponse";
import OnTimeResponse from "./OnTimeResponse";
import LateResponse from "./LateResponse";

export default function InfoFooterContent() {
    const { session, rounds } = useMapContext();
    const { score, distance, roundState, startNewRound } = useDataContext();
    const isLast: boolean = rounds.length === session?.numOfRounds;

    return (
        <>
            {distance !== null && score !== null && (
                <div className="flex flex-col gap-4 p-8 max-w-md">
                    {roundState === "LATE" && (
                        <div className="text-2xl font-bold text-error">
                            You missed the timer!
                        </div>
                    )}
                    {roundState === "NO_ANSWER" && (
                        <div className="text-2xl font-bold text-error">
                            You didn't even try!
                        </div>
                    )}
                    {roundState === "ON_TIME" && (
                        <div className="text-2xl font-bold text-success">
                            Nice! Congratulations!
                        </div>
                    )}

                    {roundState === "LATE" && <LateResponse />}
                    {roundState === "NO_ANSWER" && <NoAnswerResponse />}
                    {roundState === "ON_TIME" && (
                        <OnTimeResponse distance={distance} score={score} />
                    )}

                    {isLast ? (
                        <Link to="/results" className="btn btn-primary w-full">
                            <IoStatsChartSharp />
                            <span>See results!</span>
                        </Link>
                    ) : (
                        <button
                            className="btn btn-secondary w-full"
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
