import type { Professional } from "../models/Professional";

import { professionalService } from "../services/professionalService";

export const professionalsStore = {
    getAll(): Professional[] {
        return professionalService.getAll();
    },

    getActive(): Professional[] {
        return professionalService.getActive();
    },

    getById(id: number): Professional | undefined {
        return professionalService.getById(id);
    },
};