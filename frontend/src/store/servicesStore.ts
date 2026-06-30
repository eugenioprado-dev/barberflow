import type { Service } from "../models/Service";

import { services } from "../data/services";

export const servicesStore = {
    getAll(): Service[] {
        return services;
    },

    getActive(): Service[] {
        return services.filter((service) => service.active);
    },

    getByCategory(category: string): Service[] {
        return services.filter(
            (service) =>
                service.category === category && service.active
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