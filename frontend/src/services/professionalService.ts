import { professionals } from "../data";

export function getProfessionals() {
    return professionals.filter(
        professional => professional.active
    );
}

export function getProfessionalById(id: number) {
    return professionals.find(
        professional => professional.id === id
    );
}