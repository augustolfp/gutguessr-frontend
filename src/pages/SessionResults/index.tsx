import { useEffect, useState } from "react";
import { getSessionScore, getRanking } from "../../config/axios";
import { useAppContext } from "../../contexts/AppContext";
import { Score } from "../../types";

export default function SessionResults() {
    const [score, setScore] = useState<Score | null>(null);
    const [ranking, setRanking] = useState<Score[]>([]);

    const { session } = useAppContext();

    useEffect(() => {
        const getScore = async (sessionId: string) => {
            const result = await getSessionScore(sessionId);
            setScore(result.data);
        };

        const getSessionRanking = async () => {
            const result = await getRanking();
            setRanking(result.data);
        };
        if (session) {
            getScore(session._id);
            getSessionRanking();
        }
    }, []);

    return (
        <div className="container mx-auto h-screen mt-12 p-6 flex flex-col justify-center items-center">
            {score && (
                <div>
                    <div className="overflow-x-auto">
                        <h2 className="font-semibold text-3xl mb-6">Ranking</h2>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Username</th>
                                    <th>Rounds played</th>
                                    <th>Average Score</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ranking.map((scoreItem, index) => {
                                    if (scoreItem.sessionId === session?._id) {
                                        return (
                                            <tr className="bg-base-200">
                                                <th>{index + 1}</th>
                                                <td>
                                                    {scoreItem.username}{" "}
                                                    <span className="text-semibold">
                                                        (you)
                                                    </span>{" "}
                                                </td>
                                                <td>
                                                    {scoreItem.scores.length}
                                                </td>
                                                <td>
                                                    {scoreItem.averageScore}
                                                </td>
                                            </tr>
                                        );
                                    }
                                    return (
                                        <tr>
                                            <th>{index + 1}</th>
                                            <td>{scoreItem.username}</td>
                                            <td>{scoreItem.scores.length}</td>
                                            <td>{scoreItem.averageScore}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
