export interface ServiceFormData {
    categoryId: number;
    professionalId: number | null;

    name: string;
    description: string;

    price: number;
    duration: number;

    active: boolean;
}