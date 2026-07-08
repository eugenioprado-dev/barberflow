import type { Service } from "../models/Service";

export const services: Service[] = [
    {
        id: 3,
        professionalId: 2,
        categoryId: 2,
        name: "Manicure",
        description: "Cuidados completos para as unhas.",
        price: 40,
        duration: 45,
        active: true,
    },
    {
        id: 4,
        professionalId: 2,
        categoryId: 2,
        name: "Pedicure",
        description: "Cuidados completos para os pés.",
        price: 45,
        duration: 60,
        active: true,
    },
    {
        id: 5,
        professionalId: 3,
        categoryId: 3,
        name: "Depilação Axilas",
        description: "Depilação com cera.",
        price: 35,
        duration: 20,
        active: true,
    },
];