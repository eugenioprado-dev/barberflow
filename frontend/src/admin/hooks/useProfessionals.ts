import { useState } from "react";

import { professionalService } from "../services/professionalService";

import type { Professional } from "../../models/Professional";
import type { ProfessionalFormData } from "../models/ProfessionalFormData";

export function useProfessionals() {
    const [professionals, setProfessionals] = useState<Professional[]>(
        professionalService.getAll()
    );

    const createProfessional = (data: ProfessionalFormData) => {
        const professional = professionalService.create(data);

        setProfessionals([...professionalService.getAll()]);

        return professional;
    };

    const updateProfessional = (
        id: number,
        data: ProfessionalFormData
    ) => {
        const professional = professionalService.update(id, data);

        setProfessionals([...professionalService.getAll()]);

        return professional;
    };

    const deleteProfessional = (id: number) => {
        professionalService.delete(id);

        setProfessionals([...professionalService.getAll()]);
    };

    return {
        professionals,
        createProfessional,
        updateProfessional,
        deleteProfessional,
    };
}