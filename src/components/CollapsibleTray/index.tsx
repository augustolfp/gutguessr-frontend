import { useDataContext } from "../../contexts/DataContext";
import { useState } from "react";
import { FaMapMarked } from "react-icons/fa";
import { AiOutlineClose, AiFillWarning } from "react-icons/ai";

export default function CollapsibleTray() {
    const { submitScore, status, toggleTray, isTrayOpen } = useDataContext();
    const [errorMessage, setErrorMessage] = useState("");

    const onSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        const message = await submitScore();

        if (message) {
            setErrorMessage(message);
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
                    <div className="flex flex-col gap-1">
                        {status === "ERROR" && (
                            <div
                                role="alert"
                                className="alert alert-warning py-1 rounded-lg flex items-center justify-center"
                            >
                                <AiFillWarning />
                                <span className="text-sm">{errorMessage}</span>
                            </div>
                        )}
                        {status !== "SUCCESS" && (
                            <button
                                className="btn btn-primary w-full"
                                onClick={onSubmit}
                                disabled={status === "LOADING"}
                            >
                                {status === "LOADING"
                                    ? "Submitting..."
                                    : "Submit guess!"}
                            </button>
                        )}
                    </div>
                )}
                <button
                    className="btn btn-neutral btn-sm md:btn-md aspect-square rounded-full p-2 absolute top-1 right-1 z-20"
                    onClick={toggleTray}
                >
                    {isTrayOpen ? <AiOutlineClose /> : <FaMapMarked />}
                </button>
            </div>
        </div>
    );
}
