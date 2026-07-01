import type { Testimonial } from "../models/Testimonial";

export const testimonials: Testimonial[] = [
    {
        id: 1,
        name: "Marcos Silva",
        role: "Cliente",
        image: "",
        content:
            "Atendimento excelente, ambiente agradável e resultado acima do esperado.",
        rating: 5,
        active: true,
    },
    {
        id: 2,
        name: "Camila Oliveira",
        role: "Cliente",
        image: "",
        content:
            "Gostei muito do cuidado, da atenção e da qualidade do serviço.",
        rating: 5,
        active: true,
    },
    {
        id: 3,
        name: "Renato Souza",
        role: "Cliente",
        image: "",
        content:
            "Profissionais muito qualificados. Recomendo para quem busca qualidade.",
        rating: 5,
        active: true,
    },
];