export interface Car {
    id: number;
    name: string;
    photoBase64: string;
}

export interface CarList {
    items: Car[];
    totalItems: number;
    totalPages: number;
}