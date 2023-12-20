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
    return await axiosClient.post("/single-player-session/round", {
        sessionId: sessionId,
    });
};

export const submitRoundScore = async (sessionId: string, distance: number) => {
    return await axiosClient.post("/single-player-session/score", {
        sessionId,
        distance: distance,
    });
};

export const requestRound = async (sessionId: string) => {
    return await axiosClient.post("/single-player-session/round", {
        sessionId,
    });
};

export const getSessionScore = async (sessionId: string) => {
    return await axiosClient.get(`/single-player-session/score/${sessionId}`);
};

export const getRanking = async () => {
    return await axiosClient.get("/ranking");
};
