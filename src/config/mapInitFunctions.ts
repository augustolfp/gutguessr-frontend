import { mapBaseConfig, streetViewBaseConfig } from "./googleMapsApiConfig";
import { Round } from "../types";

const initMarker = async (markerLoader: google.maps.MarkerLibrary) => {
    const marker = new markerLoader.AdvancedMarkerElement({
        position: null,
    });

    return marker;
};

export const setMarkerPosition = async (
    marker: google.maps.marker.AdvancedMarkerElement,
    lat: number,
    lng: number
) => {
    return (marker.position = { lat: lat, lng: lng });
};

export const fitMarkersOnMap = async (
    marker1: google.maps.marker.AdvancedMarkerElement,
    marker2: google.maps.marker.AdvancedMarkerElement,
    map: google.maps.Map
) => {
    if (!marker1.position || !marker2.position) {
        throw "Marker positions are not defined";
    }

    const bounds = new google.maps.LatLngBounds();
    const positions = [marker1.position, marker2.position];
    bounds.extend(positions[0]);
    bounds.extend(positions[1]);
    map.fitBounds(bounds);
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
    if (!marker1.position) {
        throw "User Marker is missing the position property";
    }

    if (!marker2.position) {
        throw "Exact Marker is missing the position property";
    }

    const distanceInMeters = geometryLoader.spherical.computeDistanceBetween(
        marker1.position,
        marker2.position
    );

    return Math.floor(distanceInMeters / 1000);
};

const initMap = async (mapLoader: google.maps.MapsLibrary) => {
    const map = new mapLoader.Map(
        document.getElementById("map") as HTMLElement,
        mapBaseConfig
    );

    return map;
};

const initStreetView = async (
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

export const renderMaps = async (
    round: Round,
    markerLoader: google.maps.MarkerLibrary,
    mapLoader: google.maps.MapsLibrary,
    streetViewLoader: google.maps.StreetViewLibrary
) => {
    const userMarker = await initMarker(markerLoader);

    const exactMarker = await initMarker(markerLoader);
    exactMarker.position = { lat: round.lat, lng: round.lng };

    await initStreetView(
        round.lat,
        round.lng,
        round.heading,
        round.pitch,
        streetViewLoader
    );

    const map = await initMap(mapLoader);

    map.addListener("click", (mapsMouseEvent: google.maps.MapMouseEvent) => {
        if (mapsMouseEvent.latLng) {
            const { lat, lng } = mapsMouseEvent.latLng;
            userMarker.map = map;
            userMarker.position = { lat: lat(), lng: lng() };
        }
    });

    return {
        map,
        userMarker,
        exactMarker,
    };
};
