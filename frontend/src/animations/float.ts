import type { Variants } from "framer-motion";

export const floating: Variants = {
    animate: {
        y: [0, -12, 0],
        transition: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
        },
    },
};