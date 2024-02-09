export interface PokeResponse {
    count: number;
    next: string;
    previous: string;
    results: Array<PokeResult>;
}

export interface PokeResult {
    name: string;
    url: string;
}
