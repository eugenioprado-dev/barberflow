import { useContext } from "react";

import { GalleryContext } from "../context/GalleryContext";

export function useGallery() {
    const context = useContext(GalleryContext);

    if (!context) {
        throw new Error(
            "useGallery deve ser usado dentro de GalleryProvider."
        );
    }

    return context;
}