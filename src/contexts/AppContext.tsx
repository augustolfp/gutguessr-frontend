import { axiosClient } from "../config/axios";
import { Loader } from "@googlemaps/js-api-loader";
import { createContext, useState, useContext, useEffect } from "react";
import {
    initMap,
    initStreetView,
    initMarker,
    computeDistance,
    traceDistanceLine,
} from "../config/mapInitFunctions";
import { type Session, type Round } from "../types";

interface ProviderProps {
    children?: React.ReactNode;
}

interface MapContext {
    session: Session | null;
    updateSession: (session: Session) => Session | null;
    startGame: () => Promise<{ success: boolean }>;
    displayResult: () => void;
    getDistance: () => Promise<number | null>;
    rounds: Round[];
}

const AppContext = createContext({} as MapContext);

export function useAppContext() {
    return useContext(AppContext);
}

export function AppProvider({ children }: ProviderProps) {
    const [loader, setLoader] = useState<Loader | null>(null);
    const [markerLoader, setMarkerLoader] =
        useState<google.maps.MarkerLibrary | null>(null);
    const [mapLoader, setMapLoader] = useState<google.maps.MapsLibrary | null>(
        null
    );
    const [streetViewLoader, setStreetViewLoader] =
        useState<google.maps.StreetViewLibrary | null>(null);
    const [geometryLoader, setGeometryLoader] =
        useState<google.maps.GeometryLibrary | null>(null);

    const [session, setSession] = useState<Session | null>(null);
    const [rounds, setRounds] = useState<Round[]>([]);
    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [userMarker, setUserMarker] =
        useState<google.maps.marker.AdvancedMarkerElement | null>(null);
    const [exactMarker, setExactMarker] =
        useState<google.maps.marker.AdvancedMarkerElement | null>(null);
    const updateSession = (session: Session) => {
        setSession(session);
        return session;
    };

    useEffect(() => {
        const initLoader = new Loader({
            apiKey: import.meta.env.VITE_GOOGLE_CLOUD_API_KEY,
        });

        initLoader.importLibrary("marker").then((initMarkerLoader) => {
            setMarkerLoader(initMarkerLoader);
        });

        initLoader.importLibrary("maps").then((initMapLoader) => {
            setMapLoader(initMapLoader);
        });

        initLoader.importLibrary("streetView").then((initStreetViewLoader) => {
            setStreetViewLoader(initStreetViewLoader);
        });

        initLoader.importLibrary("geometry").then((initGeometryLoader) => {
            setGeometryLoader(initGeometryLoader);
        });

        setLoader(initLoader);
    }, []);

    const init = async (round: Round) => {
        if (loader && markerLoader && mapLoader && streetViewLoader) {
            const initUserMarker = await initMarker(markerLoader);
            const initExactMarker = await initMarker(markerLoader);
            initExactMarker.position = { lat: round.lat, lng: round.lng };

            const initUserMap = await initMap(mapLoader, initUserMarker);
            const panorama = await initStreetView(
                round.lat,
                round.lng,
                round.heading,
                round.pitch,
                streetViewLoader
            );

            setMap(initUserMap);
            setUserMarker(initUserMarker);
            setExactMarker(initExactMarker);
        }
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

    const displayResult = () => {
        if (map && userMarker && exactMarker && geometryLoader) {
            traceDistanceLine(userMarker, exactMarker, map);
        }
    };

    const getDistance = async () => {
        if (userMarker && exactMarker && geometryLoader) {
            const dist = await computeDistance(
                geometryLoader,
                userMarker,
                exactMarker
            );

            if (dist) {
                return Math.floor(dist / 1000);
            }
            return null;
        }
        return null;
    };

    return (
        <AppContext.Provider
            value={{
                session,
                updateSession,
                startGame,
                displayResult,
                rounds,
                getDistance,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}
