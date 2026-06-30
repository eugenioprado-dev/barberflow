import type { Gallery } from "../models/Gallery";

import { gallery } from "../data/gallery";

export const galleryService = {
    getAll(): Gallery[] {
        return gallery;
    },

    getActive(): Gallery[] {
        return gallery.filter((item) => item.active);
    },

    getById(id: number): Gallery | undefined {
        return gallery.find((item) => item.id === id);
    },

    getTotalImages(): number {
        return gallery.reduce(
            (total, item) => total + item.images.length,
            0
        );
    },
};