import axios from "axios";

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export const createSession = async (username: string, numOfRounds: number) => {
    return await axiosClient.post("/single-player-session/new", {
        username,
        numOfRounds,
    });
};

export const getFirstRound = async (sessionId: string) => {
    return await axiosClient.post("/single-player-session/start", {
        sessionId: sessionId,
    });
};

export const submitRoundScore = async (roundId: string, distance: number) => {
    return await axiosClient.post("/single-player-session/score", {
        roundId: roundId,
        distance: distance,
    });
};
