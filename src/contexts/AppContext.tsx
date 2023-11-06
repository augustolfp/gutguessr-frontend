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

interface ProviderProps {
    children?: React.ReactNode;
}

interface MapContext {
    round: number;
    nextRound: () => void;
    submit: () => Promise<void>;
    distance: number | null;
    map: google.maps.Map | null;
    userMarker: google.maps.marker.AdvancedMarkerElement | null;
    panorama: google.maps.StreetViewPanorama | null;
}

const AppContext = createContext({} as MapContext);

export function useAppContext() {
    return useContext(AppContext);
}

export function AppProvider({ children }: ProviderProps) {
    const [round, setRound] = useState(0);
    const { lat, lng, heading, pitch } = defaultMap[round];
    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [userMarker, setUserMarker] =
        useState<google.maps.marker.AdvancedMarkerElement | null>(null);
    const [panorama, setPanorama] =
        useState<google.maps.StreetViewPanorama | null>(null);
    const [distance, setDistance] = useState<number | null>(null);

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
        setDistance(null);
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

            setDistance(Math.trunc((distance ?? 0) / 1000));
        }
    };

    return (
        <AppContext.Provider
            value={{
                round,
                nextRound,
                distance,
                map,
                userMarker,
                panorama,
                submit,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}
