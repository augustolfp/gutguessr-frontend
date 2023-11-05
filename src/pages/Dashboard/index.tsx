import { useEffect, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import defaultMap from "../../defaultMap.json";
import {
    initMap,
    initStreetView,
    renderResult,
} from "../../config/mapInitFunctions";

const loader = new Loader({
    apiKey: import.meta.env.VITE_GOOGLE_CLOUD_API_KEY,
});

export default function Dashboard() {
    const { lat, lng, heading, pitch } = defaultMap[0];
    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [userMarker, setUserMarker] =
        useState<google.maps.marker.AdvancedMarkerElement | null>(null);
    const [panorama, setPanorama] =
        useState<google.maps.StreetViewPanorama | null>(null);
    // const { map, userMarker } = await initMap(loader);
    // const panorama = await initStreetView(lat, lng, heading, pitch, loader);

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
    }, []);

    const handleSubmit = async () => {
        if (map && userMarker) {
            await renderResult(lat, lng, map, userMarker, loader);
        }
    };

    return (
        <div>
            <div id="panorama" className="w-48 h-48"></div>
            <div id="map" className="w-48 h-48"></div>
            <button className="btn btn-primary" onClick={handleSubmit}>
                Submit guess
            </button>
        </div>
    );
}
