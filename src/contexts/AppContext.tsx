import calculateScore from "../utils/calculateScore";
import { axiosClient } from "../config/axios";
import { Loader } from "@googlemaps/js-api-loader";
import { createContext, useState, useContext } from "react";
import {
    initMap,
    initStreetView,
    renderResult,
} from "../config/mapInitFunctions";

const loader = new Loader({
    apiKey: import.meta.env.VITE_GOOGLE_CLOUD_API_KEY,
});

type ScoreObj = {
    round: number;
    score: number;
    distance: number | null;
};

type Session = {
    _id: string;
    username: string;
    numOfRounds: number;
};

interface ProviderProps {
    children?: React.ReactNode;
}

type Seed = {
    panoId: string;
    lat: number;
    lng: number;
    heading: number;
    pitch: number;
    imageDate: string;
    links: string[];
};

interface MapContext {
    session: Session | null;
    updateSession: (session: Session) => Session | null;
    round: number;
    nextRound: () => void;
    submit: () => Promise<void>;
    scores: ScoreObj[];
    init: () => void;
    seeds: Seed[];
    getSeeds: () => void;
}

const AppContext = createContext({} as MapContext);

export function useAppContext() {
    return useContext(AppContext);
}

export function AppProvider({ children }: ProviderProps) {
    const [session, setSession] = useState<Session | null>(null);
    const [scores, setScores] = useState<ScoreObj[]>([]);
    const [seeds, setSeeds] = useState<Seed[]>([]);
    const [round, setRound] = useState(0);
    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [userMarker, setUserMarker] =
        useState<google.maps.marker.AdvancedMarkerElement | null>(null);

    const getSeeds = async () => {
        const result = await axiosClient.get(`/singlePlayer/6`);
        setSeeds(result.data);
    };

    const updateSession = (session: Session) => {
        setSession(session);
        return session;
    };

    const init = async () => {
        const { map, userMarker } = await initMap(loader);
        const panorama = await initStreetView(
            seeds[round].lat,
            seeds[round].lng,
            seeds[round].heading,
            seeds[round].pitch,
            loader
        );

        setMap(map);
        setUserMarker(userMarker);
    };

    const nextRound = () => {
        setMap(null);
        setUserMarker(null);

        setRound((prev) => prev + 1);
    };

    const submit = async () => {
        if (map && userMarker) {
            const { distance } = await renderResult(
                seeds[round].lat,
                seeds[round].lng,
                map,
                userMarker,
                loader
            );

            let score: ScoreObj = { distance: null, score: 0, round: round };
            if (distance) {
                score.distance = Math.trunc(distance / 1000);
                score.score = calculateScore(Math.trunc(distance / 1000));
            }
            setScores((prev) => [...prev, score]);
        }
    };

    return (
        <AppContext.Provider
            value={{
                round,
                nextRound,
                submit,
                scores,
                init,
                getSeeds,
                seeds,
                session,
                updateSession,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}
