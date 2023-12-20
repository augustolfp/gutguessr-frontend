import { requestRound } from "../config/axios";
import useLoaders from "../hooks/useLoaders";
import { createContext, useState, useContext } from "react";
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
    rounds: Round[];
    requestNewRound: () => Promise<void>;
    calculateDistance: () => Promise<number>;
}

const MapContext = createContext({} as MapContext);

export function useMapContext() {
    return useContext(MapContext);
}

export function MapProvider({ children }: ProviderProps) {
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
        if (!geometryLoader) {
            throw "Google Geometry Loader is not defined.";
        }

        if (!userMarker || !exactMarker) {
            throw "Markers are not defined.";
        }

        if (!userMarker.position) {
            throw "No point selected on the map.";
        }

        const distance = await computeDistance(
            geometryLoader,
            userMarker,
            exactMarker
        );

        return distance;
    };

    return (
        <MapContext.Provider
            value={{
                session,
                updateSession,
                requestNewRound,
                displayResult,
                rounds,
                calculateDistance,
            }}
        >
            {children}
        </MapContext.Provider>
    );
}
