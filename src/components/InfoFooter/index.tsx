import { useAppContext } from "../../contexts/AppContext";

export default function InfoFooter() {
    const { goToNextRound } = useAppContext();

    return (
        <div className="px-6 flex items-center gap-2 h-1/6">
            <button className="btn btn-secondary" onClick={goToNextRound}>
                Next round!
            </button>
        </div>
    );
}
