import { useState } from "react";

import { galleryService } from "../services/galleryService";

import type { Gallery } from "../../models/Gallery";
import type { GalleryFormData } from "../models/GalleryFormData";

export function useGallery() {
    const [gallery, setGallery] = useState<Gallery[]>(
        galleryService.getAll()
    );

    const createGalleryItem = (data: GalleryFormData) => {
        const item = galleryService.create(data);

        setGallery([...galleryService.getAll()]);

        return item;
    };

    const updateGalleryItem = (
        id: number,
        data: GalleryFormData
    ) => {
        const item = galleryService.update(id, data);

        setGallery([...galleryService.getAll()]);

        return item;
    };

    const deleteGalleryItem = (id: number) => {
        galleryService.delete(id);

        setGallery([...galleryService.getAll()]);
    };

    return {
        gallery,
        createGalleryItem,
        updateGalleryItem,
        deleteGalleryItem,
    };
}