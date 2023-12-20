import {
    getFirstRound,
    submitRoundScore,
    requestNextRound,
} from "../config/axios";
import useLoaders from "../hooks/useLoaders";
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
    startGame: () => Promise<void>;
    displayResult: () => void;
    submitDistance: () => Promise<void>;
    rounds: Round[];
    distance: number | null;
    score: number | null;
    goToNextRound: () => Promise<void>;
}

const AppContext = createContext({} as MapContext);

export function useAppContext() {
    return useContext(AppContext);
}

export function AppProvider({ children }: ProviderProps) {
    const {
        loader,
        markerLoader,
        mapLoader,
        streetViewLoader,
        geometryLoader,
    } = useLoaders();

    const [session, setSession] = useState<Session | null>(null);
    const [rounds, setRounds] = useState<Round[]>([]);
    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [userMarker, setUserMarker] =
        useState<google.maps.marker.AdvancedMarkerElement | null>(null);
    const [exactMarker, setExactMarker] =
        useState<google.maps.marker.AdvancedMarkerElement | null>(null);
    const [distance, setDistance] = useState<number | null>(null);
    const [score, setScore] = useState<number | null>(null);
    const updateSession = (session: Session) => {
        setSession(session);
        return session;
    };

    const renderRound = async (round: Round) => {
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
            const { data } = await getFirstRound(session._id);

            setRounds([...data.rounds]);

            renderRound(data.rounds[0]);
        }
    };

    const goToNextRound = async () => {
        if (session) {
            const { data } = await requestNextRound(session._id);
            setRounds([...data.rounds]);
            setDistance(null);
            setScore(null);
            await renderRound(data.rounds[data.rounds.length - 1]);
        }
    };

    const displayResult = () => {
        if (map && userMarker && exactMarker && geometryLoader) {
            exactMarker.map = map;
            traceDistanceLine(userMarker, exactMarker, map);
        }
    };

    const calculateDistance = async () => {
        if (userMarker && exactMarker && geometryLoader) {
            const dist = await computeDistance(
                geometryLoader,
                userMarker,
                exactMarker
            );

            if (dist) {
                setDistance(Math.floor(dist / 1000));
                return Math.floor(dist / 1000);
            }
            return null;
        }
        return null;
    };

    const submitDistance = async () => {
        const getDistance = await calculateDistance();
        if (getDistance && session) {
            const result = await submitRoundScore(session._id, getDistance);
            setScore(result.data.score);
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
                submitDistance,
                distance,
                score,
                goToNextRound,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}
