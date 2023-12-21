import { GiHammerSickle } from "react-icons/gi";

export default function NoAnswerResponse() {
    return (
        <div className="flex flex-col items-center gap-1 w-full">
            <div className="flex justify-between w-full">
                <div>
                    <div className="stat-title">So I sent you to</div>
                    <div className="stat-value text-error">Siberia</div>
                    <div className="stat-desc">just beacuse I can.</div>
                </div>
                <div className="stat-figure text-error">
                    <GiHammerSickle size={60} />
                </div>
            </div>
            <span className="font-light text-xs text-base-content">
                (0 points)
            </span>
        </div>
    );
}
