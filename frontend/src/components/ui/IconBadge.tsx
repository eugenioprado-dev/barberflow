import {
    FaCut,
    FaHandSparkles,
    FaSpa,
    FaShoePrints,
    FaStar,
} from "react-icons/fa";

interface IconBadgeProps {
    icon: string;
}

export function IconBadge({ icon }: IconBadgeProps) {
    const icons = {
        cut: <FaCut />,
        hand: <FaHandSparkles />,
        foot: <FaShoePrints />,
        spa: <FaSpa />,
    };

    return (
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-lg text-amber-400">
            {icons[icon as keyof typeof icons] ?? <FaStar />}
        </div>
    );
}