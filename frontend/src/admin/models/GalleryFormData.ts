export interface GalleryFormData {
    title: string;

    description: string;

    image: File | null;

    images: File[];

    professionalId: number;

    active: boolean;
}