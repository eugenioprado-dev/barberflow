import { useContext } from "react";

import { TestimonialContext } from "../context/TestimonialContext";

export function useTestimonials() {
    const context = useContext(TestimonialContext);

    if (!context) {
        throw new Error(
            "useTestimonials deve ser usado dentro de TestimonialProvider."
        );
    }

    return context;
}