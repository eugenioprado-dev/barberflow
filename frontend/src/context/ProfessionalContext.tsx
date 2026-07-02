import {
    createContext,
    useCallback,
    useEffect,
    useState,
    type ReactNode,
} from "react";

import type { Professional } from "../models/Professional";
import { professionalService } from "../services/professionalService";

export interface ProfessionalContextData {
    professionals: Professional[];
    loading: boolean;
    reload: () => Promise<void>;
    createProfessional: (
        data: Omit<Professional, "id">
    ) => Promise<Professional>;
    updateProfessional: (
        id: number,
        data: Partial<Omit<Professional, "id">>
    ) => Promise<Professional>;
    deleteProfessional: (id: number) => Promise<void>;
}

export const ProfessionalContext =
    createContext<ProfessionalContextData | null>(null);

interface Props {
    children: ReactNode;
}

export function ProfessionalProvider({ children }: Props) {
    const [professionals, setProfessionals] = useState<Professional[]>([]);
    const [loading, setLoading] = useState(true);

    const reload = useCallback(async () => {
        setLoading(true);

        try {
            const data = await professionalService.getAll();
            setProfessionals(data);
        } finally {
            setLoading(false);
        }
    }, []);

    async function createProfessional(data: Omit<Professional, "id">) {
        const professional = await professionalService.create(data);
        await reload();
        return professional;
    }

    async function updateProfessional(
        id: number,
        data: Partial<Omit<Professional, "id">>
    ) {
        const professional = await professionalService.update(id, data);
        await reload();
        return professional;
    }

    async function deleteProfessional(id: number) {
        await professionalService.delete(id);
        await reload();
    }

    useEffect(() => {
        void reload();
    }, [reload]);

    return (
        <ProfessionalContext.Provider
            value={{
                professionals,
                loading,
                reload,
                createProfessional,
                updateProfessional,
                deleteProfessional,
            }}
        >
            {children}
        </ProfessionalContext.Provider>
    );
}