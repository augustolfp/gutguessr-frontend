import { createContext, useState, useContext } from "react";
import { useMapContext } from "./MapContext";
import { submitRoundScore } from "../config/axios";

interface ProviderProps {
    children?: React.ReactNode;
}

interface DataContext {
    score: number | null;
    distance: number | null;
    isLate: boolean;
    submitScore: () => Promise<void>;
}

const DataContext = createContext({} as DataContext);

export function useDataContext() {
    return useContext(DataContext);
}

export function DataProvider({ children }: ProviderProps) {
    const [score, setScore] = useState<number | null>(null);
    const [distance, setDistance] = useState<number | null>(null);

    const [isLate, setIsLate] = useState(false);

    const { calculateDistance, session } = useMapContext();

    const submitScore = async () => {
        const distance = await calculateDistance();
        setDistance(distance);
        if (!session?._id) {
            throw "Session not found.";
        }

        const { data } = await submitRoundScore(session?._id, distance);
        setScore(data.rounds[data.rounds.length - 1].score);
        setIsLate(data.rounds[data.rounds.length - 1].isScoreSubmitLate);
    };

    return (
        <DataContext.Provider value={{ score, distance, isLate, submitScore }}>
            {children}
        </DataContext.Provider>
    );
}
