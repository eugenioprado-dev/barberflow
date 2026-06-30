import type { Gallery } from "../../models/Gallery";
import type { GalleryFormData } from "../models/GalleryFormData";

import { gallery } from "../../data/gallery";

const createImagePreview = (file: File | null): string => {
    if (!file) {
        return "";
    }

    return URL.createObjectURL(file);
};

const createImagePreviews = (files: File[]): string[] => {
    return files.map((file) => URL.createObjectURL(file));
};

export const galleryService = {
    getAll(): Gallery[] {
        return gallery;
    },

    create(data: GalleryFormData): Gallery {
        const newGalleryItem: Gallery = {
            id: Date.now(),
            title: data.title,
            description: data.description,
            image: createImagePreview(data.image),
            images: createImagePreviews(data.images),
            professionalId: data.professionalId,
            active: data.active,
        };

        gallery.push(newGalleryItem);

        return newGalleryItem;
    },

    update(id: number, data: GalleryFormData): Gallery | null {
        const galleryItem = gallery.find((item) => item.id === id);

        if (!galleryItem) {
            return null;
        }

        galleryItem.title = data.title;
        galleryItem.description = data.description;
        galleryItem.professionalId = data.professionalId;
        galleryItem.active = data.active;

        if (data.image) {
            galleryItem.image = createImagePreview(data.image);
        }

        if (data.images.length > 0) {
            galleryItem.images = createImagePreviews(data.images);
        }

        return galleryItem;
    },

    delete(id: number): void {
        const index = gallery.findIndex((item) => item.id === id);

        if (index !== -1) {
            gallery.splice(index, 1);
        }
    },
};