import { useAppContext } from "../../contexts/AppContext";
import { Link } from "react-router-dom";

export default function InfoFooter() {
    const { goToNextRound, session, rounds } = useAppContext();
    const isLast: boolean = rounds.length === session?.numOfRounds;
    return (
        <div className="px-6 flex items-center gap-2 h-1/6">
            {isLast ? (
                <Link to="/results" className="btn btn-secondary">
                    See results!
                </Link>
            ) : (
                <button className="btn btn-secondary" onClick={goToNextRound}>
                    Next round!
                </button>
            )}
        </div>
    );
}
