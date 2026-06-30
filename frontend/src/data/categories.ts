import type { Category } from "../models/Category";

export const categories: Category[] = [
    {
        id: 1,
        name: "Barbearia",
        icon: "cut",
        description:
            "Cortes modernos, barba, acabamento e cuidados masculinos com atendimento personalizado.",
        active: true,
    },
    {
        id: 2,
        name: "Manicure & Pedicure",
        icon: "hand",
        description:
            "Cuidados completos para unhas das mãos e dos pés, com qualidade e bem-estar.",
        active: true,
    },
    {
        id: 3,
        name: "Depilação & Massagem",
        icon: "spa",
        description:
            "Depilação profissional e massagens relaxantes para seu conforto e bem-estar.",
        active: true,
    },
];