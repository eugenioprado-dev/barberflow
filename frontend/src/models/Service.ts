export interface Service {
    id: number;

    categoryId: number;
    professionalId: number;

    name: string;
    description: string;

    price: number;
    duration: number;

    active: boolean;
}