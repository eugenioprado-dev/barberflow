import type { Professional } from "../models/Professional";

import AndreDias from "../assets/images/team/andre-dias.webp";
import Dina from "../assets/images/team/dina.jpeg";
import Silvana from "../assets/images/team/silvana.jpeg";

export const professionals: Professional[] = [
    {
        id: 1,
        name: "André Dias",
        role: "Especialista em Cortes Unissex",
        image: AndreDias,
        whatsapp: "5511999999999",
        active: true,
    },
    {
        id: 2,
        name: "Dina",
        role: "Manicure & Pedicure",
        image: Dina,
        whatsapp: "5511999999999",
        active: true,
    },
    {
        id: 3,
        name: "Silvana",
        role: "Especialista em Depilação & Massagem",
        image: Silvana,
        whatsapp: "5511999999999",
        active: true,
    },
];