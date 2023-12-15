export type Session = {
    _id: string;
    username: string;
    numOfRounds: number;
};

export type Round = {
    _id: string;
    lat: number;
    lng: number;
    heading: number;
    pitch: number;
    score: number | null;
    timestamp: number;
};
