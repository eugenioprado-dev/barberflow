import type { ReactNode } from "react";

interface PageHeaderProps {
    title: string;
    description: string;
    action?: ReactNode;
}

export function PageHeader({
    title,
    description,
    action,
}: PageHeaderProps) {
    return (
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
                <h1 className="text-3xl font-bold">
                    {title}
                </h1>

                <p className="mt-2 text-zinc-400">
                    {description}
                </p>
            </div>

            {action && (
                <div className="flex-shrink-0">
                    {action}
                </div>
            )}
        </div>
    );
}