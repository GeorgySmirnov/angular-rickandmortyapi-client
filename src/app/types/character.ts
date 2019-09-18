
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

export const CharacterFilterValues = {
    name: '',
    status: ['alive', 'dead', 'unknown'],
    species: '',
    type: '',
    gender: ['female', 'male', 'genderless', 'unknown'],
} as const;

type ValuesToType<T> = {
    -readonly [K in keyof T]?: T[K] extends readonly string[] ? T[K][number] : string;
};

export type CharacterFilter = ValuesToType<typeof CharacterFilterValues>;
