import { useAppContext } from "../../contexts/AppContext";

export default function InfoFooter() {
    // const { nextRound, scores } = useAppContext();

    return (
        <div className="px-6 flex items-center gap-2 h-1/6">
            {/* <button className="btn btn-secondary" onClick={nextRound}>
                Next round!
            </button> */}
            <div>
                <h2>Scores:</h2>
                {/* <ul>
                    {scores.map((score, index) => (
                        <li key={index} className="flex gap-1">
                            <span className="font-black">
                                Round {score.round + 1}
                            </span>
                            <span>
                                <strong>Score:</strong>
                                {score.score}
                            </span>
                            <span>
                                <strong>Distance:</strong>
                                {score.distance} km
                            </span>
                        </li>
                    ))}
                </ul> */}
            </div>
        </div>
    );
}
