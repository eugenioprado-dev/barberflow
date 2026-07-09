import type { SiteConfig } from "../models/Site";

import { site } from "../data/site";
import { supabase } from "../lib/supabase";

interface SiteConfigRow {
    id: number;
    business_name: string;
    subtitle: string | null;
    slogan: string | null;
    description: string | null;
    phone: string | null;
    whatsapp: string | null;
    instagram: string | null;
    email: string | null;
    address: string | null;
    opening_hours: string | null;
    google_maps_url: string | null;
}

function mapRowToSiteConfig(row: SiteConfigRow): SiteConfig {
    return {
        business: {
            name: row.business_name,
            subtitle: row.subtitle ?? "",
            slogan: row.slogan ?? "",
            description: row.description ?? "",
            phone: row.phone ?? "",
            whatsapp: row.whatsapp ?? "",
            instagram: row.instagram ?? "",
            email: row.email ?? "",
            address: row.address ?? "",
            openingHours: row.opening_hours ?? "",
            googleMapsUrl: row.google_maps_url ?? "",
        },
        menu: site.menu,
        services: site.services,
    };
}

export const siteService = {
    get(): SiteConfig {
        return site;
    },

    async getFromSupabase(): Promise<SiteConfig> {
        const { data, error } = await supabase
            .from("site_config")
            .select("*")
            .single();

        if (error) {
            console.error("Erro ao buscar configurações:", error);
            return site;
        }

        return mapRowToSiteConfig(data);
    },

    async updateToSupabase(data: SiteConfig): Promise<void> {
        const { error } = await supabase
            .from("site_config")
            .update({
                business_name: data.business.name,
                subtitle: data.business.subtitle,
                slogan: data.business.slogan,
                description: data.business.description,
                phone: data.business.phone,
                whatsapp: data.business.whatsapp,
                instagram: data.business.instagram,
                email: data.business.email,
                address: data.business.address,
                opening_hours: data.business.openingHours,
                google_maps_url: data.business.googleMapsUrl,
            })
            .eq("id", 1);

        if (error) {
            throw error;
        }
    },
};