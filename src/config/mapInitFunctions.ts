import { mapBaseConfig, streetViewBaseConfig } from "./googleMapsApiConfig";

export const initMarker = async (markerLoader: google.maps.MarkerLibrary) => {
    const marker = new markerLoader.AdvancedMarkerElement({
        position: null,
    });

    return marker;
};

export const traceDistanceLine = (
    marker1: google.maps.marker.AdvancedMarkerElement,
    marker2: google.maps.marker.AdvancedMarkerElement,
    map: google.maps.Map
) => {
    if (marker1.position && marker2.position) {
        const path = [marker1.position, marker2.position];

        const distanceLine = new google.maps.Polyline({
            path: path,
            geodesic: true,
            strokeColor: "#FF0000",
            strokeOpacity: 1.0,
            strokeWeight: 2,
        });

        distanceLine.setMap(map);
    }
};

export const computeDistance = async (
    geometryLoader: google.maps.GeometryLibrary,
    marker1: google.maps.marker.AdvancedMarkerElement,
    marker2: google.maps.marker.AdvancedMarkerElement
) => {
    if (marker1.position && marker2.position) {
        const distanceInMeters =
            geometryLoader.spherical.computeDistanceBetween(
                marker1.position,
                marker2.position
            );
        return distanceInMeters;
    }

    return null;
};

export const initMap = async (
    mapLoader: google.maps.MapsLibrary,
    userMarker: google.maps.marker.AdvancedMarkerElement
) => {
    const map = new mapLoader.Map(
        document.getElementById("map") as HTMLElement,
        mapBaseConfig
    );

    map.addListener("click", (mapsMouseEvent: google.maps.MapMouseEvent) => {
        if (mapsMouseEvent.latLng) {
            const { lat, lng } = mapsMouseEvent.latLng;
            userMarker.map = map;
            userMarker.position = { lat: lat(), lng: lng() };
        }
    });

    return map;
};

export const initStreetView = async (
    lat: number,
    lng: number,
    heading: number,
    pitch: number,
    streetViewLoader: google.maps.StreetViewLibrary
) => {
    const streetViewOptions: google.maps.StreetViewPanoramaOptions = {
        position: {
            lat,
            lng,
        },
        pov: {
            heading,
            pitch,
        },
        ...streetViewBaseConfig,
    };

    const streetView = new streetViewLoader.StreetViewPanorama(
        document.getElementById("panorama") as HTMLElement,
        streetViewOptions
    );

    return streetView;
};
