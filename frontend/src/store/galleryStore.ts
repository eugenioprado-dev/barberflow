import type { Gallery } from "../models/Gallery";

import { galleryService } from "../services/galleryService";

export const galleryStore = {
    getAll(): Gallery[] {
        return galleryService.getAll();
    },

    getActive(): Gallery[] {
        return galleryService.getAll().filter((item) => item.active);
    },

    getById(id: number): Gallery | undefined {
        return galleryService.getAll().find((item) => item.id === id);
    },

    getTotalImages(): number {
        return galleryService
            .getAll()
            .reduce((total, item) => total + item.images.length, 0);
    },
};