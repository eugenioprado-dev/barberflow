import type { Service } from "../models/Service";

import { services } from "../data/services";

export const serviceService = {
    getAll(): Service[] {
        return services;
    },

    getActive(): Service[] {
        return services.filter((service) => service.active);
    },

    getById(id: number): Service | undefined {
        return services.find((service) => service.id === id);
    },

    getByCategory(category: string): Service[] {
        return services.filter(
            (service) =>
                service.active && service.category === category
        );
    },

    getByProfessional(id: number): Service[] {
        return services.filter(
            (service) =>
                service.active && service.professionalId === id
        );
    },

    getCategories(): string[] {
        return Array.from(
            new Set(
                services
                    .filter((service) => service.active)
                    .map((service) => service.category)
            )
        );
    },
};