import { axiosClient } from "../config/axios";
import { Loader } from "@googlemaps/js-api-loader";
import { createContext, useState, useContext } from "react";
import {
    initMap,
    initStreetView,
    renderResult,
} from "../config/mapInitFunctions";
import { type Session, type Round } from "../types";

const loader = new Loader({
    apiKey: import.meta.env.VITE_GOOGLE_CLOUD_API_KEY,
});

interface ProviderProps {
    children?: React.ReactNode;
}

interface MapContext {
    session: Session | null;
    updateSession: (session: Session) => Session | null;
    init: () => Promise<void>;
    startGame: () => Promise<{ success: boolean }>;
}

const AppContext = createContext({} as MapContext);

export function useAppContext() {
    return useContext(AppContext);
}

export function AppProvider({ children }: ProviderProps) {
    const [session, setSession] = useState<Session | null>(null);
    // const [rounds, setRounds] = useState<Round[]>([]);
    const rounds: Round[] = [];
    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [userMarker, setUserMarker] =
        useState<google.maps.marker.AdvancedMarkerElement | null>(null);

    const updateSession = (session: Session) => {
        setSession(session);
        return session;
    };

    const init = async () => {
        const { map, userMarker } = await initMap(loader);
        const panorama = await initStreetView(
            rounds[rounds.length - 1].lat,
            rounds[rounds.length - 1].lng,
            rounds[rounds.length - 1].heading,
            rounds[rounds.length - 1].pitch,
            loader
        );

        setMap(map);
        setUserMarker(userMarker);
    };

    const startGame = async () => {
        console.log("rodei1");
        if (session && rounds.length === 0) {
            console.log("rodei 2");
            try {
                const result = await axiosClient.post(
                    "/single-player-session/start",
                    {
                        sessionId: session._id,
                    }
                );
                console.log(result.data.rounds[0]);
                rounds.push({
                    _id: result.data.rounds[0]._id,
                    lat: result.data.rounds[0].lat,
                    lng: result.data.rounds[0].lng,
                    heading: result.data.rounds[0].heading,
                    pitch: result.data.rounds[0].pitch,
                    score: result.data.rounds[0].score,
                    timestamp: result.data.rounds[0].timestamp,
                });
                console.log(rounds);
                init();
                return {
                    success: true,
                };
            } catch (err) {
                return {
                    success: false,
                };
            }
        }
        return {
            success: false,
        };
    };

    return (
        <AppContext.Provider
            value={{
                init,
                session,
                updateSession,
                startGame,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}
