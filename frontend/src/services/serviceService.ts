import { services } from "../data";

export function getServices() {
    return services.filter(service => service.active);
}

export function getServiceById(id: number) {
    return services.find(service => service.id === id);
}

export function getServicesByCategory(category: string) {
    return services.filter(
        service =>
            service.active &&
            service.category === category
    );
}

export function getServicesByProfessional(id: number) {
    return services.filter(
        service =>
            service.active &&
            service.professionalId === id
    );
}