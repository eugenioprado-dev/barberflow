import type { Service } from "../../models/Service";
import type { ServiceFormData } from "../models/ServiceFormData";

import { services } from "../../data/services";

export const serviceService = {
    getAll(): Service[] {
        return services;
    },

    create(data: ServiceFormData): Service {
        const newService: Service = {
            id: Date.now(),
            professionalId: data.professionalId,
            category: data.category,
            name: data.name,
            description: data.description,
            price: data.price,
            duration: data.duration,
            active: data.active,
        };

        services.push(newService);

        return newService;
    },

    update(id: number, data: ServiceFormData): Service | null {
        const service = services.find((item) => item.id === id);

        if (!service) {
            return null;
        }

        service.professionalId = data.professionalId;
        service.category = data.category;
        service.name = data.name;
        service.description = data.description;
        service.price = data.price;
        service.duration = data.duration;
        service.active = data.active;

        return service;
    },

    delete(id: number): void {
        const index = services.findIndex((service) => service.id === id);

        if (index !== -1) {
            services.splice(index, 1);
        }
    },
};