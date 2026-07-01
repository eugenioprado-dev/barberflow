import type { Professional } from "../models/Professional";

import { professionals } from "../data/professionals";

export const professionalService = {
    getAll(): Professional[] {
        return professionals;
    },

    getActive(): Professional[] {
        return professionals.filter(
            (professional) => professional.active
        );
    },

    getById(id: number): Professional | undefined {
        return professionals.find(
            (professional) => professional.id === id
        );
    },
};