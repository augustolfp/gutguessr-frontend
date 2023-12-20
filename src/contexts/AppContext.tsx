import { getFirstRound, submitRoundScore, requestRound } from "../config/axios";
import useLoaders from "../hooks/useLoaders";
import { createContext, useState, useContext, useEffect } from "react";
import {
    renderMaps,
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
    displayResult: () => void;
    submitDistance: () => Promise<void>;
    rounds: Round[];
    distance: number | null;
    score: number | null;
    requestNewRound: () => Promise<void>;
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
            const { map, userMarker, exactMarker } = await renderMaps(
                round,
                markerLoader,
                mapLoader,
                streetViewLoader
            );

            setMap(map);
            setUserMarker(userMarker);
            setExactMarker(exactMarker);
        }
    };

    const requestNewRound = async () => {
        if (session) {
            const { data } = await requestRound(session._id);
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
                requestNewRound,
                displayResult,
                rounds,
                submitDistance,
                distance,
                score,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}
