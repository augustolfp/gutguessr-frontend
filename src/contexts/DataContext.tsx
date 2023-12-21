import { createContext, useState, useContext } from "react";
import { useMapContext } from "./MapContext";
import { submitRoundScore } from "../config/axios";

interface ProviderProps {
    children?: React.ReactNode;
}

interface DataContext {
    score: number | null;
    distance: number | null;
    startNewRound: () => Promise<void>;
    submitScore: () => Promise<string | undefined>;
    status: "IDLE" | "LOADING" | "ERROR" | "SUCCESS";
    roundState: "ON_TIME" | "LATE" | "NO_ANSWER";
    isTrayOpen: boolean;
    toggleTray: () => void;
    sendToSiberia: () => Promise<void>;
}

const DataContext = createContext({} as DataContext);

export function useDataContext() {
    return useContext(DataContext);
}

export function DataProvider({ children }: ProviderProps) {
    const [isTrayOpen, setIsTrayOpen] = useState(false);
    const [score, setScore] = useState<number | null>(null);
    const [distance, setDistance] = useState<number | null>(null);
    const [roundState, setRoundState] = useState<
        "ON_TIME" | "LATE" | "NO_ANSWER"
    >("ON_TIME");
    const [status, setStatus] = useState<
        "IDLE" | "LOADING" | "ERROR" | "SUCCESS"
    >("IDLE");
    const {
        calculateDistance,
        session,
        displayResult,
        updateRoundsList,
        renderRound,
        setUserMarkerPosition,
    } = useMapContext();

    const toggleTray = () => {
        setIsTrayOpen((prev) => !prev);
    };

    const submitScore = async (autoTriggered?: boolean) => {
        try {
            setStatus("LOADING");
            const distance = await calculateDistance();
            setDistance(distance);

            if (!session?._id) {
                throw "Session not found.";
            }
            const { data } = await submitRoundScore(session?._id, distance);
            setScore(data.rounds[data.rounds.length - 1].score);
            if (autoTriggered) {
                setRoundState("NO_ANSWER");
            }
            if (
                !autoTriggered &&
                data.rounds[data.rounds.length - 1].isScoreSubmitLate
            ) {
                setRoundState("LATE");
            }
            if (
                !autoTriggered &&
                !data.rounds[data.rounds.length - 1].isScoreSubmitLate
            ) {
                setRoundState("ON_TIME");
            }
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

    const sendToSiberia = async () => {
        const siberia = {
            lat: 73.581466,
            lng: 142.151322,
        };

        try {
            setStatus("LOADING");
            await setUserMarkerPosition(siberia.lat, siberia.lng);
            await submitScore(true);
            setIsTrayOpen(true);
        } catch (err) {
            console.log(err);
        }
    };

    const startNewRound = async () => {
        try {
            const newRound = await updateRoundsList();
            await renderRound(newRound);
            clearData();
            setIsTrayOpen(false);
        } catch (err) {
            console.log(err);
        }
    };

    const clearData = () => {
        setScore(null);
        setDistance(null);
        setRoundState("ON_TIME");
        setStatus("IDLE");
    };

    return (
        <DataContext.Provider
            value={{
                score,
                distance,
                submitScore,
                status,
                roundState,
                startNewRound,
                sendToSiberia,
                isTrayOpen,
                toggleTray,
            }}
        >
            {children}
        </DataContext.Provider>
    );
}
