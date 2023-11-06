import { useAppContext } from "../../contexts/AppContext";
import ScoreBadge from "../../components/ScoreBadge";
import InfoFooter from "../../components/InfoFooter";
import CollapsibleTray from "../../components/CollapsibleTray";

export default function Dashboard() {
    return (
        <div className="w-screen h-screen">
            <ScoreBadge />
            <div className="relative h-5/6">
                <div id="panorama" className="w-full h-full" />

                <CollapsibleTray />
            </div>
            <InfoFooter />
        </div>
    );
}
