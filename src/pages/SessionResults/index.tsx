import { useEffect, useState } from "react";
import { getSessionScore } from "../../config/axios";
import { useAppContext } from "../../contexts/AppContext";
import { Score } from "../../types";

export default function SessionResults() {
    const [score, setScore] = useState<Score | null>(null);

    const { session } = useAppContext();

    useEffect(() => {
        const getScore = async (sessionId: string) => {
            const result = await getSessionScore(sessionId);
            setScore(result.data);
        };
        if (session) {
            getScore(session._id);
        }
    }, []);

    return (
        <div className="container mx-auto h-screen mt-12 p-6 flex flex-col justify-center items-center">
            {score && (
                <>
                    <ul>
                        {score.scores.map((score, index) => (
                            <li key={index}>
                                Round {index + 1}: {score} Points
                            </li>
                        ))}
                    </ul>
                    <div>Average Score: {score.averageScore} Points</div>
                </>
            )}
        </div>
    );
}
