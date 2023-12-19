import { useAppContext } from "../../contexts/AppContext";

export default function RoundBadge() {
    const { session, rounds } = useAppContext();
    const numerator = rounds.length;
    const denominator = session?.numOfRounds;

    return (
        <div className="absolute top-2 right-0 bg-base-100 flex z-30 p-3 gap-2 font-light rounded-bl-xl rounded-tl-xl">
            <div className="flex flex-col text-base-content items-center">
                <span>Round</span>
                {denominator && (
                    <span className="font-semibold">
                        {numerator} of {denominator}
                    </span>
                )}
            </div>
        </div>
    );
}
