import { useAppContext } from "../../contexts/AppContext";
import { useEffect } from "react";
import RoundBadge from "../../components/RoundBadge";
import InfoFooter from "../../components/InfoFooter";
import CollapsibleTray from "../../components/CollapsibleTray";

export default function Dashboard() {
    const { startGame } = useAppContext();
    useEffect(() => {
        console.log("Ai meu caralho");
        startGame();
    }, []);

    return (
        <div className="w-screen h-screen">
            <RoundBadge />
            <div className="relative h-5/6">
                <div id="panorama" className="w-full h-full" />

                <CollapsibleTray />
            </div>
            <InfoFooter />
        </div>
    );
}
