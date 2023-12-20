import { useMapContext } from "../../contexts/MapContext";
import { useState } from "react";
import { FaMapMarked } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { submitRoundScore } from "../../config/axios";

export default function CollapsibleTray() {
    const { displayResult, calculateDistance, session } = useMapContext();
    const [isLoading, setIsLoading] = useState(false);
    const [warning, setWarning] = useState("");
    const [isTrayOpen, setIsTrayOpen] = useState(false);
    const [score, setScore] = useState<number | null>(null);
    const [distance, setDistance] = useState<number | null>(null);
    const [isLate, setIsLate] = useState(false);

    const onSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        setWarning("");
        setIsLoading(true);

        const distance = await calculateDistance();
        if (distance === null) {
            setWarning("Choose a place on the map before submitting!");
            setIsLoading(false);
            return;
        }

        if (distance && session) {
            setDistance(distance);
            try {
                const { data } = await submitRoundScore(session._id, distance);
                displayResult();
                setScore(data.rounds[data.rounds.length - 1].score);
                setIsLate(data.rounds[data.rounds.length - 1].isLate);
            } catch (err: any) {
                const errMsg = err.message ?? "Unexpect error";
                setWarning(errMsg);
            } finally {
                setIsLoading(false);
            }
        }
    };

    let trayStyle: string = isTrayOpen
        ? "absolute bottom-0 right-0 z-10 w-full h-2/3 md:bottom-4 md:right-4 md:w-1/2 md:h-1/2 transition-all"
        : "absolute bottom-0 right-0 z-10 w-14 h-14 md:bottom-4 md:right-4 transition-all";

    let mapContainerStyle: string = isTrayOpen
        ? "h-full w-full opacity-100"
        : "h-full w-full opacity-0";

    return (
        <div className={`${trayStyle}`}>
            <div className="flex flex-col gap-1 h-full w-full">
                <div id="map" className={`${mapContainerStyle}`}></div>
                {isTrayOpen && (
                    <div>
                        <p>{warning}</p>
                        <p>
                            {score}, {distance}, {isLate}
                        </p>
                        <button
                            className="btn btn-primary w-full"
                            onClick={onSubmit}
                            disabled={isLoading}
                        >
                            {isLoading ? "Submitting..." : "Submit guess!"}
                        </button>
                    </div>
                )}
                <button
                    className="btn btn-neutral btn-sm md:btn-md aspect-square rounded-full p-2 absolute top-1 right-1 z-20"
                    onClick={() => setIsTrayOpen((prev) => !prev)}
                >
                    {isTrayOpen ? <AiOutlineClose /> : <FaMapMarked />}
                </button>
            </div>
        </div>
    );
}
