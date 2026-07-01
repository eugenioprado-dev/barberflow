import type { SiteConfig } from "../models/Site";

import { siteService } from "../services/siteService";

export const siteStore = {
    get(): SiteConfig {
        return siteService.get();
    },

    async update(data: SiteConfig): Promise<void> {
        await siteService.updateToSupabase(data);
    },
};