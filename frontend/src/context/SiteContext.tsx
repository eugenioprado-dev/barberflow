import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import type { SiteConfig } from "../models/Site";

import { siteService } from "../services/siteService";

interface SiteContextData {
    site: SiteConfig | null;
    loading: boolean;
    reload: () => Promise<void>;
}

const SiteContext = createContext<SiteContextData | null>(null);

export function SiteProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [site, setSite] = useState<SiteConfig | null>(null);
    const [loading, setLoading] = useState(true);

    async function reload() {
        setLoading(true);

        try {
            const config = await siteService.getFromSupabase();

            setSite(config);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        reload();
    }, []);

    return (
        <SiteContext.Provider
            value={{
                site,
                loading,
                reload,
            }}
        >
            {children}
        </SiteContext.Provider>
    );
}

export function useSiteContext() {
    const context = useContext(SiteContext);

    if (!context) {
        throw new Error(
            "useSiteContext deve ser usado dentro de SiteProvider."
        );
    }

    return context;
}