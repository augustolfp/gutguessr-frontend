import { useAppContext } from "../../contexts/AppContext";
import { useState } from "react";
import { FaMapMarked } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { axiosClient } from "../../config/axios";

export default function CollapsibleTray() {
    const { displayResult, rounds } = useAppContext();
    const [isTrayOpen, setIsTrayOpen] = useState(false);
    const [distance, setDistance] = useState<number | null>(null);
    const [score, setScore] = useState<number | null>(null);

    const onSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        const submitDistance = async (dist: number) => {
            try {
                const result = await axiosClient.post(
                    "/single-player-session/score",
                    {
                        roundId: rounds[rounds.length - 1]._id,
                        distance: dist,
                    }
                );
                setScore(result.data.score);
            } catch (err) {
                console.log(err);
            } finally {
            }
        };

        const dist = await displayResult();
        if (dist) {
            setDistance(dist);
            await submitDistance(dist);
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
                    <button
                        className="btn btn-primary w-full"
                        onClick={onSubmit}
                    >
                        Submit guess!
                    </button>
                )}
                <button
                    className="btn btn-neutral btn-sm md:btn-md aspect-square rounded-full p-2 absolute top-1 right-1 z-20"
                    onClick={() => setIsTrayOpen((prev) => !prev)}
                >
                    {isTrayOpen ? <AiOutlineClose /> : <FaMapMarked />}
                </button>
            </div>
            <div>score: {score}</div>
        </div>
    );
}
