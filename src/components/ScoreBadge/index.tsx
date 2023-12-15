import { useAppContext } from "../../contexts/AppContext";

export default function ScoreBadge() {
    // const { round, scores } = useAppContext();
    return (
        <div className="absolute top-10 right-0 bg-base-100 flex z-30 p-3 gap-2 font-light rounded-bl-xl rounded-tl-xl">
            <div className="flex flex-col text-base-content items-center">
                <span>Round</span>
                {/* <span className="font-semibold">{round + 1}</span> */}
            </div>
            <div className="flex flex-col text-base-content items-center">
                <span>Total Score</span>
                {/* <span className="font-semibold">
                    {scores.reduce((acc, obj) => {
                        return acc + obj.score;
                    }, 0)}
                </span> */}
            </div>
        </div>
    );
}
