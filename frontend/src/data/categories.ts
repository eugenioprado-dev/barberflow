import type { ServiceCategory } from "../models/ServiceCategory";

export const serviceCategories: ServiceCategory[] = [
    {
        id: 1,
        icon: "cut",
        title: "Barbearia",
        description:
            "Cortes modernos, barba, acabamento e cuidados masculinos com atendimento personalizado.",
        active: true,
    },
    {
        id: 2,
        icon: "hand",
        title: "Manicure & Pedicure",
        description:
            "Cuidados completos para unhas das mãos e pés, com qualidade e bem-estar.",
        active: true,
    },
    {
        id: 3,
        icon: "spa",
        title: "Depilação & Massagem",
        description:
            "Depilação profissional e massagens relaxantes para o seu bem-estar.",
        active: true,
    },
];