import { useState, useEffect } from "react";
import { Loader } from "@googlemaps/js-api-loader";

export default function useLoaders() {
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

    return {
        loader,
        markerLoader,
        mapLoader,
        streetViewLoader,
        geometryLoader,
    };
}
