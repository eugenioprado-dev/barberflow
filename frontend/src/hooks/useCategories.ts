import { useContext } from "react";

import { CategoryContext } from "../context/CategoryContext";

export function useCategories() {
    const context = useContext(CategoryContext);

    if (!context) {
        throw new Error(
            "useCategories deve ser usado dentro de CategoryProvider."
        );
    }

    return context;
}