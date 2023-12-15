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
    startGame: () => Promise<{ success: boolean }>;
    displayResult: () => Promise<number | undefined>;
    rounds: Round[];
}

const AppContext = createContext({} as MapContext);

export function useAppContext() {
    return useContext(AppContext);
}

export function AppProvider({ children }: ProviderProps) {
    const [session, setSession] = useState<Session | null>(null);
    const [rounds, setRounds] = useState<Round[]>([]);
    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [userMarker, setUserMarker] =
        useState<google.maps.marker.AdvancedMarkerElement | null>(null);

    const updateSession = (session: Session) => {
        setSession(session);
        return session;
    };

    const init = async (round: Round) => {
        const { map, userMarker } = await initMap(loader);
        const panorama = await initStreetView(
            round.lat,
            round.lng,
            round.heading,
            round.pitch,
            loader
        );

        setMap(map);
        setUserMarker(userMarker);
    };

    const startGame = async () => {
        if (session && rounds.length === 0) {
            try {
                const result = await axiosClient.post(
                    "/single-player-session/start",
                    {
                        sessionId: session._id,
                    }
                );

                setRounds([
                    {
                        _id: result.data.rounds[0]._id,
                        lat: result.data.rounds[0].lat,
                        lng: result.data.rounds[0].lng,
                        heading: result.data.rounds[0].heading,
                        pitch: result.data.rounds[0].pitch,
                        score: result.data.rounds[0].score,
                        timestamp: result.data.rounds[0].timestamp,
                    },
                ]);

                init(result.data.rounds[0]);
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

    const displayResult = async () => {
        if (map && userMarker) {
            const { distance: dist } = await renderResult(
                rounds[rounds.length - 1].lat,
                rounds[rounds.length - 1].lng,
                map,
                userMarker,
                loader
            );
            return Math.trunc((dist ?? 0) / 1000);
        }
    };

    return (
        <AppContext.Provider
            value={{
                session,
                updateSession,
                startGame,
                displayResult,
                rounds,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}
