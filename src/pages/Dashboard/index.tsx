import {
    GoogleMap,
    useJsApiLoader,
    StreetViewPanorama,
} from "@react-google-maps/api";
import { useState, useCallback, memo } from "react";

const containerStyle = {
    width: "400px",
    height: "400px",
};

const center = {
    lat: -3.745,
    lng: -38.523,
};

function Dashboard() {
    const [map, setMap] = useState<google.maps.Map | null>(null);

    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_CLOUD_API_KEY,
    });

    const onLoad = useCallback((map: google.maps.Map) => {
        setMap(map);
    }, []);

    const onUnmount = useCallback((_map: google.maps.Map) => {
        setMap(null);
    }, []);

    return (
        <div>
            <h1>DASHBOARD</h1>
            {isLoaded ? (
                <>
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={center}
                        zoom={10}
                        onLoad={onLoad}
                        onUnmount={onUnmount}
                    ></GoogleMap>
                </>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
}

export default memo(Dashboard);
