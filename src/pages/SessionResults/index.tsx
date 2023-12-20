import { useEffect, useState } from "react";
import { getRanking } from "../../config/axios";
import { useMapContext } from "../../contexts/MapContext";
import { Score } from "../../types";

export default function SessionResults() {
    const [ranking, setRanking] = useState<Score[]>([]);

    const { session } = useMapContext();

    useEffect(() => {
        getRanking().then(({ data }) => {
            setRanking(data);
        });
    }, []);

    return (
        <div className="container mx-auto h-screen mt-12 p-6 flex flex-col justify-center items-center">
            {ranking && (
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
                                            <tr
                                                key={index}
                                                className="bg-base-200"
                                            >
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
                                        <tr key={index}>
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
