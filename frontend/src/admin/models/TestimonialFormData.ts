export interface TestimonialFormData {
    name: string;
    role: string;
    image: File | null;
    content: string;
    rating: number;
    active: boolean;
}