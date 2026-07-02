import {
    createContext,
    useCallback,
    useEffect,
    useState,
    type ReactNode,
} from "react";

import type { Service } from "../models/Service";
import { serviceService } from "../services/serviceService";

export interface ServiceContextData {
    services: Service[];
    loading: boolean;
    reload: () => Promise<void>;
    createService: (data: Omit<Service, "id">) => Promise<Service>;
    updateService: (
        id: number,
        data: Partial<Omit<Service, "id">>
    ) => Promise<Service>;
    deleteService: (id: number) => Promise<void>;
}

export const ServiceContext =
    createContext<ServiceContextData | null>(null);

interface Props {
    children: ReactNode;
}

export function ServiceProvider({ children }: Props) {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);

    const reload = useCallback(async () => {
        setLoading(true);

        try {
            const data = await serviceService.getAll();
            setServices(data);
        } finally {
            setLoading(false);
        }
    }, []);

    async function createService(data: Omit<Service, "id">) {
        const service = await serviceService.create(data);
        await reload();
        return service;
    }

    async function updateService(
        id: number,
        data: Partial<Omit<Service, "id">>
    ) {
        const service = await serviceService.update(id, data);
        await reload();
        return service;
    }

    async function deleteService(id: number) {
        await serviceService.delete(id);
        await reload();
    }

    useEffect(() => {
        void reload();
    }, [reload]);

    return (
        <ServiceContext.Provider
            value={{
                services,
                loading,
                reload,
                createService,
                updateService,
                deleteService,
            }}
        >
            {children}
        </ServiceContext.Provider>
    );
}