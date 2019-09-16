
export interface Character {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: LocationRecord;
    location: LocationRecord;
    image: string;
    episode: string[];
    url: string;
    created: string;
}

export interface LocationRecord {
    name: string;
    url: string;
}
