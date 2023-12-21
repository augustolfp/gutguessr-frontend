import { useMapContext } from "../../contexts/MapContext";
import { useDataContext } from "../../contexts/DataContext";
import { useEffect } from "react";
import RoundBadge from "../../components/RoundBadge";
import InfoFooter from "../../components/InfoFooter";
import CollapsibleTray from "../../components/CollapsibleTray";
import CountDownTimer from "../../components/CountdownTimer";

export default function Dashboard() {
    const { startNewRound, status } = useDataContext();
    const { rounds } = useMapContext();
    useEffect(() => {
        startNewRound();
    }, []);

    let panoramaStyle: string =
        status === "SUCCESS"
            ? "relative h-3/6 transition-all"
            : "relative h-5/6 transition-all";

    return (
        <div className="w-screen h-screen">
            <RoundBadge />
            <div className={`${panoramaStyle}`}>
                {rounds.length !== 0 &&
                    rounds[rounds.length - 1].creationTimestamp && (
                        <CountDownTimer
                            timestamp={
                                rounds[rounds.length - 1].creationTimestamp
                            }
                        />
                    )}
                <div id="panorama" className="w-full h-full" />

                <CollapsibleTray />
            </div>
            <InfoFooter />
        </div>
    );
}
