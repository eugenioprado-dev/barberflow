import {
    createContext,
    useCallback,
    useEffect,
    useState,
    type ReactNode,
} from "react";

import type { SiteConfig } from "../models/Site";

import { siteService } from "../services/siteService";

interface SiteContextData {
    site: SiteConfig | null;
    loading: boolean;
    reload: () => Promise<void>;
}

export const SiteContext =
    createContext<SiteContextData | null>(null);

interface Props {
    children: ReactNode;
}

export function SiteProvider({ children }: Props) {
    const [site, setSite] = useState<SiteConfig | null>(null);
    const [loading, setLoading] = useState(true);

    const reload = useCallback(async () => {
        setLoading(true);

        try {
            const config = await siteService.getFromSupabase();
            setSite(config);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        void reload();
    }, [reload]);

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