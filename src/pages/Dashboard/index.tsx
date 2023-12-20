import { useAppContext } from "../../contexts/AppContext";
import { useEffect } from "react";
import RoundBadge from "../../components/RoundBadge";
import InfoFooter from "../../components/InfoFooter";
import CollapsibleTray from "../../components/CollapsibleTray";
import CountDownTimer from "../../components/CountdownTimer";

export default function Dashboard() {
    const { requestNewRound, rounds } = useAppContext();
    useEffect(() => {
        requestNewRound();
    }, []);

    return (
        <div className="w-screen h-screen">
            <RoundBadge />
            <div className="relative h-5/6">
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
