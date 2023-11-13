import calculateScore from "../utils/calculateScore";
import { axiosClient } from "../config/axios";
import { Loader } from "@googlemaps/js-api-loader";
import { createContext, useState, useEffect, useContext } from "react";
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
    round: number;
    nextRound: () => void;
    submit: () => Promise<void>;
    map: google.maps.Map | null;
    userMarker: google.maps.marker.AdvancedMarkerElement | null;
    panorama: google.maps.StreetViewPanorama | null;
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
    const [scores, setScores] = useState<ScoreObj[]>([]);
    const [seeds, setSeeds] = useState<Seed[]>([]);
    const [round, setRound] = useState(0);
    // const { lat, lng, heading, pitch } = seeds[round];
    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [userMarker, setUserMarker] =
        useState<google.maps.marker.AdvancedMarkerElement | null>(null);
    const [panorama, setPanorama] =
        useState<google.maps.StreetViewPanorama | null>(null);

    const getSeeds = async () => {
        const result = await axiosClient.get(`/singlePlayer/6`);
        setSeeds(result.data);
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
        setPanorama(panorama);
        setMap(map);
        setUserMarker(userMarker);
    };

    const nextRound = () => {
        setMap(null);
        setUserMarker(null);
        setPanorama(null);
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
                map,
                userMarker,
                panorama,
                submit,
                scores,
                init,
                getSeeds,
                seeds,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}
