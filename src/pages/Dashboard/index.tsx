import { useAppContext } from "../../contexts/AppContext";
import InfoFooter from "../../components/InfoFooter";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { useState } from "react";
import { FaMapMarked } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";

export default function Dashboard() {
    const isDesktop = useMediaQuery("(min-width: 600px)");
    const { submit } = useAppContext();
    const [isTrayOpen, setIsTrayOpen] = useState(false);

    let trayStyle: string = isTrayOpen
        ? "absolute bottom-0 right-0 z-10 w-full h-2/3 transition-all"
        : "absolute bottom-0 right-0 z-10 w-10 h-10 transition-all";

    let mapContainerStyle: string = isTrayOpen
        ? "h-full w-full opacity-100"
        : "h-full w-full opacity-0";
    return (
        <div className="w-screen h-screen">
            <div className="relative h-5/6">
                <div id="panorama" className="w-full h-full" />

                <div className={`${trayStyle}`}>
                    <div className="flex flex-col gap-1 h-full w-full">
                        <div id="map" className={`${mapContainerStyle}`}></div>
                        {isTrayOpen && (
                            <button
                                className="btn btn-primary w-full"
                                onClick={submit}
                            >
                                Submit guess!
                            </button>
                        )}
                        <button
                            className="btn btn-neutral btn-sm aspect-square rounded-full p-2 absolute top-1 right-1 z-20"
                            onClick={() => setIsTrayOpen((prev) => !prev)}
                        >
                            {isTrayOpen ? <AiOutlineClose /> : <FaMapMarked />}
                        </button>
                    </div>
                </div>
            </div>
            <InfoFooter />
        </div>
    );
}
