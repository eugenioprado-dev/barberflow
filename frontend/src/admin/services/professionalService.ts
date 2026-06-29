import type { ProfessionalFormData } from "../models/ProfessionalFormData";
import type { Professional } from "../../models/Professional";

import { professionals } from "../../data/professionals";

export const professionalService = {
    getAll(): Professional[] {
        return professionals;
    },

    create(data: ProfessionalFormData): Professional {
        const newProfessional: Professional = {
            id: Date.now(),
            name: data.name,
            role: data.role,
            whatsapp: data.whatsapp,
            instagram: data.instagram,
            image: "",
            active: data.active,
        };

        professionals.push(newProfessional);

        return newProfessional;
    },

    update(id: number, data: ProfessionalFormData): Professional | null {
        const professional = professionals.find(
            (item) => item.id === id
        );

        if (!professional) {
            return null;
        }

        professional.name = data.name;
        professional.role = data.role;
        professional.whatsapp = data.whatsapp;
        professional.instagram = data.instagram;
        professional.active = data.active;

        return professional;
    },

    delete(id: number): void {
        const index = professionals.findIndex(
            (professional) => professional.id === id
        );

        if (index !== -1) {
            professionals.splice(index, 1);
        }
    },
};