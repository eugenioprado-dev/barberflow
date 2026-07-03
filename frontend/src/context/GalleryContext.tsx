import {
    createContext,
    useCallback,
    useEffect,
    useState,
    type ReactNode,
} from "react";

import type { Gallery } from "../models/Gallery";
import { galleryService } from "../services/galleryService";

export interface GalleryContextData {
    gallery: Gallery[];
    loading: boolean;

    reload: () => Promise<void>;

    createGallery: (
        data: Omit<Gallery, "id">
    ) => Promise<Gallery>;

    updateGallery: (
        id: number,
        data: Partial<Omit<Gallery, "id">>
    ) => Promise<Gallery>;

    deleteGallery: (id: number) => Promise<void>;
}

export const GalleryContext =
    createContext<GalleryContextData | null>(null);

interface Props {
    children: ReactNode;
}

export function GalleryProvider({
    children,
}: Props) {
    const [gallery, setGallery] = useState<Gallery[]>([]);
    const [loading, setLoading] = useState(true);

    const reload = useCallback(async () => {
        setLoading(true);

        try {
            const data = await galleryService.getAll();

            setGallery(data);
        } finally {
            setLoading(false);
        }
    }, []);

    async function createGallery(
        data: Omit<Gallery, "id">
    ) {
        const created =
            await galleryService.create(data);

        await reload();

        return created;
    }

    async function updateGallery(
        id: number,
        data: Partial<Omit<Gallery, "id">>
    ) {
        const updated =
            await galleryService.update(id, data);

        await reload();

        return updated;
    }

    async function deleteGallery(id: number) {
        await galleryService.delete(id);

        await reload();
    }

    useEffect(() => {
        void reload();
    }, [reload]);

    return (
        <GalleryContext.Provider
            value={{
                gallery,
                loading,
                reload,
                createGallery,
                updateGallery,
                deleteGallery,
            }}
        >
            {children}
        </GalleryContext.Provider>
    );
}