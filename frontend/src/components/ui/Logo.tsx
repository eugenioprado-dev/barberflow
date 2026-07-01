import { theme } from "../../styles/theme";

import { useSite } from "../../hooks/useSite";

export function Logo() {
    const { site, loading } = useSite();

    if (loading || !site) {
        return (
            <div className="select-none">
                <h1
                    className="text-3xl font-bold leading-none"
                    style={{ fontFamily: theme.fonts.title }}
                >
                    Carregando...
                </h1>
            </div>
        );
    }

    const [firstName, ...restName] = site.business.name.split(" ");
    const highlightedName = restName.pop();
    const middleName = restName.join(" ");

    return (
        <div className="select-none">
            <h1
                className="text-3xl font-bold leading-none"
                style={{ fontFamily: theme.fonts.title }}
            >
                {firstName}{" "}
                {middleName && `${middleName} `}
                <span style={{ color: theme.colors.primary }}>
                    {highlightedName}
                </span>
            </h1>

            <p className="mt-2 text-[10px] uppercase tracking-[0.45em] text-zinc-400">
                {site.business.subtitle}
            </p>
        </div>
    );
}