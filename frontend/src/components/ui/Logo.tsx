import { theme } from "../../styles/theme";
import { site } from "../../constants/site";

export function Logo() {
    return (
        <div className="select-none">
            <h1
                className="text-3xl font-bold leading-none"
                style={{ fontFamily: theme.fonts.title }}
            >
                {site.business.name.split(" ")[0]}{" "}
                <span style={{ color: theme.colors.primary }}>
                    {site.business.name.split(" ")[1]}
                </span>
            </h1>

            <p className="mt-2 text-[10px] uppercase tracking-[0.45em] text-zinc-400">
                {site.business.subtitle}
            </p>
        </div>
    );
}