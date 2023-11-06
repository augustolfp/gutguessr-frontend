import calculateScore from "../utils/calculateScore";
import { Loader } from "@googlemaps/js-api-loader";
import { createContext, useState, useEffect, useContext } from "react";
import defaultMap from "../defaultMap.json";
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

interface MapContext {
    round: number;
    nextRound: () => void;
    submit: () => Promise<void>;
    map: google.maps.Map | null;
    userMarker: google.maps.marker.AdvancedMarkerElement | null;
    panorama: google.maps.StreetViewPanorama | null;
    scores: ScoreObj[];
}

const AppContext = createContext({} as MapContext);

export function useAppContext() {
    return useContext(AppContext);
}

export function AppProvider({ children }: ProviderProps) {
    const [scores, setScores] = useState<ScoreObj[]>([]);
    const [round, setRound] = useState(0);
    const { lat, lng, heading, pitch } = defaultMap[round];
    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [userMarker, setUserMarker] =
        useState<google.maps.marker.AdvancedMarkerElement | null>(null);
    const [panorama, setPanorama] =
        useState<google.maps.StreetViewPanorama | null>(null);

    useEffect(() => {
        const init = async () => {
            const { map, userMarker } = await initMap(loader);
            const panorama = await initStreetView(
                lat,
                lng,
                heading,
                pitch,
                loader
            );
            setPanorama(panorama);
            setMap(map);
            setUserMarker(userMarker);
        };
        init();
    }, [round]);

    const nextRound = () => {
        setMap(null);
        setUserMarker(null);
        setPanorama(null);
        setRound((prev) => prev + 1);
    };

    const submit = async () => {
        if (map && userMarker) {
            const { distance } = await renderResult(
                lat,
                lng,
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
            }}
        >
            {children}
        </AppContext.Provider>
    );
}
