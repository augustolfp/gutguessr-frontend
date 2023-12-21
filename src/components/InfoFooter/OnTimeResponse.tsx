interface Props {
    distance: number;
    score: number;
}

export default function OnTimeResponse({ distance, score }: Props) {
    return (
        <div className="stat px-0">
            <div className="stat-title">{distance} km from exact location</div>
            <div className="stat-value text-primary">{score} POINTS</div>
            <div className="stat-desc">Of 5000 points max</div>
        </div>
    );
}
