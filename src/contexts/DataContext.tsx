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
    submitScore: () => Promise<string | undefined>;
    status: "IDLE" | "LOADING" | "ERROR" | "SUCCESS";
    clearData: () => void;
}

const DataContext = createContext({} as DataContext);

export function useDataContext() {
    return useContext(DataContext);
}

export function DataProvider({ children }: ProviderProps) {
    const [score, setScore] = useState<number | null>(null);
    const [distance, setDistance] = useState<number | null>(null);
    const [isLate, setIsLate] = useState(false);
    const [status, setStatus] = useState<
        "IDLE" | "LOADING" | "ERROR" | "SUCCESS"
    >("IDLE");
    const { calculateDistance, session, displayResult } = useMapContext();

    const submitScore = async () => {
        try {
            setStatus("LOADING");
            const distance = await calculateDistance();
            setDistance(distance);

            if (!session?._id) {
                throw "Session not found.";
            }
            const { data } = await submitRoundScore(session?._id, distance);
            setScore(data.rounds[data.rounds.length - 1].score);
            setIsLate(data.rounds[data.rounds.length - 1].isScoreSubmitLate);
            setStatus("SUCCESS");
            displayResult();
        } catch (err) {
            setStatus("ERROR");
            if (typeof err === "string") {
                return err;
            }
            return "A unknown error happened";
        }
    };

    const clearData = () => {
        setScore(null);
        setDistance(null);
        setIsLate(false);
        setStatus("IDLE");
    };

    return (
        <DataContext.Provider
            value={{ score, distance, isLate, submitScore, clearData, status }}
        >
            {children}
        </DataContext.Provider>
    );
}
