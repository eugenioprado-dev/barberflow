import type { ReactNode } from "react";
import { motion } from "framer-motion";

import { fadeUp } from "../../animations/fade";

interface RevealProps {
    children: ReactNode;
    className?: string;
    delay?: number;
}

export function Reveal({
    children,
    className = "",
    delay = 0,
}: RevealProps) {
    return (
        <motion.div
            className={className}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{
                once: true,
                amount: 0.2,
            }}
            transition={{
                delay,
            }}
        >
            {children}
        </motion.div>
    );
}