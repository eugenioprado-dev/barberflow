import { theme } from "../../styles/theme";
import { site } from "../../data";

export function Logo() {
    return (
        <div className="select-none">
            <h1
                className="text-3xl font-bold leading-none"
                style={{ fontFamily: theme.fonts.title }}
            >
                André Dias{" "}
                <span style={{ color: theme.colors.primary }}>
                    Studio
                </span>
            </h1>

            <p className="mt-2 text-[10px] uppercase tracking-[0.45em] text-zinc-400">
                {site.business.subtitle}
            </p>
        </div>
    );
}