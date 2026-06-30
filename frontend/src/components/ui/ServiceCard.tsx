import { useState } from "react";
import type { ReactNode } from "react";

import { ServiceModal } from "../../modals/ServiceModal";
import { Button } from "./Button";

interface ServiceCardProps {
    icon: ReactNode;
    title: string;
    description: string;
    category: string;
}

export function ServiceCard({
    icon,
    title,
    description,
    category,
}: ServiceCardProps) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <div
                className="
                    flex
                    h-full
                    w-full
                    flex-col
                    rounded-3xl
                    border
                    border-zinc-800
                    bg-gradient-to-b
                    from-zinc-900
                    to-zinc-950
                    p-8
                    shadow-xl
                    transition-all
                    duration-300
                    hover:border-amber-400
                    hover:shadow-[0_25px_60px_rgba(245,158,11,0.25)]
                    lg:hover:scale-[1.03]
                "
            >
                <div className="text-5xl text-amber-500">
                    {icon}
                </div>

                <h3 className="mt-6 text-2xl font-semibold text-white">
                    {title}
                </h3>

                <p className="mt-4 flex-1 leading-7 text-zinc-400">
                    {description}
                </p>

                <Button
                    type="button"
                    onClick={() => setOpen(true)}
                    className="mt-8 w-full"
                >
                    Ver Serviços
                </Button>
            </div>

            <ServiceModal
                open={open}
                onClose={() => setOpen(false)}
                title={title}
                icon=""
                category={category}
            />
        </>
    );
}