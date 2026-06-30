export interface Gallery {
    id: number;

    title: string;

    description: string;

    /**
     * Imagem de capa
     */
    image: string;

    /**
     * Todas as imagens do trabalho
     */
    images: string[];

    professionalId: number;

    active: boolean;
}