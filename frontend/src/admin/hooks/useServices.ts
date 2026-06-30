import { useState } from "react";

import { serviceService } from "../services/serviceService";

import type { Service } from "../../models/Service";
import type { ServiceFormData } from "../models/ServiceFormData";

export function useServices() {
    const [services, setServices] = useState<Service[]>(
        serviceService.getAll()
    );

    function createService(data: ServiceFormData) {
        const service = serviceService.create(data);

        setServices([...serviceService.getAll()]);

        return service;
    }

    function updateService(
        id: number,
        data: ServiceFormData
    ) {
        const service = serviceService.update(id, data);

        setServices([...serviceService.getAll()]);

        return service;
    }

    function deleteService(id: number) {
        serviceService.delete(id);

        setServices([...serviceService.getAll()]);
    }

    return {
        services,
        createService,
        updateService,
        deleteService,
    };
}