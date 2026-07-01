import type { Service } from "../models/Service";

import { serviceService } from "../services/serviceService";

export const servicesStore = {
    getAll(): Service[] {
        return serviceService.getAll();
    },

    getActive(): Service[] {
        return serviceService.getActive();
    },

    getById(id: number): Service | undefined {
        return serviceService.getById(id);
    },

    getByCategory(category: string): Service[] {
        return serviceService.getByCategory(category);
    },

    getByProfessional(id: number): Service[] {
        return serviceService.getByProfessional(id);
    },

    getCategories(): string[] {
        return serviceService.getCategories();
    },
};