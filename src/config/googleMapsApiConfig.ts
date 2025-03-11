const genericStartingPoint = { lat: -13.3268339, lng: -41.1476912 };

export const mapBaseConfig: google.maps.MapOptions = {
    center: genericStartingPoint,
    clickableIcons: false,
    disableDefaultUI: true,
    zoom: 3,
    mapId: "DEMO_MAP_ID",
    gestureHandling: "greedy",
};

export const streetViewBaseConfig: google.maps.StreetViewPanoramaOptions = {
    addressControl: false,
    disableDefaultUI: true,
    motionTracking: false,
    motionTrackingControl: false,
    showRoadLabels: false,
    zoomControlOptions: {
        position: 6
    } 
};
