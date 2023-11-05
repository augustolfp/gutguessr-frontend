import { useAppContext } from "../../contexts/AppContext";
import InfoFooter from "../../components/InfoFooter";

export default function Dashboard() {
    const { round, nextRound, submit, distance } = useAppContext();

    return (
        <div className="w-screen h-screen">
            <div className="relative h-5/6">
                <div id="panorama" className="w-full h-full" />

                <div className="absolute bottom-0 right-0 z-10 w-10 h-10 md:w-1/4 md:hover:w-2/5 md:h-1/3 md:hover:h-1/2 md:bottom-6 md:right-6 transition-all">
                    <div className="w-full h-full">
                        <div id="map" className="h-full w-full"></div>
                    </div>
                </div>
            </div>
            <InfoFooter />
        </div>
    );
}
