import { Loader } from "@googlemaps/js-api-loader";
import { mapBaseConfig, streetViewBaseConfig } from "./googleMapsApiConfig";

const initMarker = async (map: google.maps.Map, loader: Loader) => {
    const markerLoader = await loader.importLibrary("marker");
    const marker = new markerLoader.AdvancedMarkerElement({
        map: map,
        position: null,
    });

    return marker;
};

const traceDistanceLine = (
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

const computeDistance = async (
    loader: Loader,
    marker1: google.maps.marker.AdvancedMarkerElement,
    marker2: google.maps.marker.AdvancedMarkerElement
) => {
    const distanceLoader = await loader.importLibrary("geometry");

    if (marker1.position && marker2.position) {
        const distanceInMeters =
            distanceLoader.spherical.computeDistanceBetween(
                marker1.position,
                marker2.position
            );
        return distanceInMeters;
    }

    return null;
};

export const renderResult = async (
    lat: number,
    lng: number,
    map: google.maps.Map,
    userMarker: google.maps.marker.AdvancedMarkerElement,
    loader: Loader
) => {
    if (userMarker.position) {
        const exactMarker = await initMarker(map, loader);
        exactMarker.position = { lat, lng };

        traceDistanceLine(userMarker, exactMarker, map);
        const distance = await computeDistance(loader, userMarker, exactMarker);
        return { distance: distance };
    }
};

export const initMap = async (loader: Loader) => {
    const mapLoader = await loader.importLibrary("maps");
    const map = new mapLoader.Map(
        document.getElementById("map") as HTMLElement,
        mapBaseConfig
    );
    const userMarker = await initMarker(map, loader);

    map.addListener("click", (mapsMouseEvent: google.maps.MapMouseEvent) => {
        if (mapsMouseEvent.latLng) {
            const { lat, lng } = mapsMouseEvent.latLng;
            userMarker.position = { lat: lat(), lng: lng() };
        }
    });

    return { map, userMarker };
};

export const initStreetView = async (
    lat: number,
    lng: number,
    heading: number,
    pitch: number,
    loader: Loader
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

    const streetViewLoader = await loader.importLibrary("streetView");
    const streetView = new streetViewLoader.StreetViewPanorama(
        document.getElementById("panorama") as HTMLElement,
        streetViewOptions
    );

    return streetView;
};
