import { useContext } from "react";

import { ProfessionalContext } from "../context/ProfessionalContext";

export function useProfessionals() {
    const context = useContext(ProfessionalContext);

    if (!context) {
        throw new Error(
            "useProfessionals deve ser usado dentro de ProfessionalProvider."
        );
    }

    return context;
}