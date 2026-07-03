import type { Gallery } from "../models/Gallery";

import { supabase } from "../lib/supabase";
import { BaseCrudService } from "./BaseCrudService";

interface GalleryRow {
    id: number;
    title: string;
    description: string | null;
    image: string | null;
    images: string[] | null;
    professional_id: number | null;
    active: boolean;
}

function mapRowToGallery(row: GalleryRow): Gallery {
    return {
        id: row.id,
        title: row.title,
        description: row.description ?? "",
        image: row.image ?? "",
        images: row.images ?? [],
        professionalId: row.professional_id,
        active: row.active,
    };
}

function mapGalleryToRow(data: Omit<Gallery, "id">) {
    return {
        title: data.title,
        description: data.description,
        image: data.image,
        images: data.images,
        professional_id: data.professionalId,
        active: data.active,
    };
}

class GalleryService extends BaseCrudService<Gallery> {
    constructor() {
        super("gallery");
    }

    async getAll(): Promise<Gallery[]> {
        const { data, error } = await supabase
            .from(this.table)
            .select("*")
            .order("id");

        this.handleError(error);

        return (data ?? []).map((row) =>
            mapRowToGallery(row as GalleryRow)
        );
    }

    async getActive(): Promise<Gallery[]> {
        const { data, error } = await supabase
            .from(this.table)
            .select("*")
            .eq("active", true)
            .order("id");

        this.handleError(error);

        return (data ?? []).map((row) =>
            mapRowToGallery(row as GalleryRow)
        );
    }

    async create(data: Omit<Gallery, "id">): Promise<Gallery> {
        const { data: created, error } = await supabase
            .from(this.table)
            .insert(mapGalleryToRow(data))
            .select()
            .single();

        this.handleError(error);

        return mapRowToGallery(created as GalleryRow);
    }

    async update(
        id: number,
        data: Partial<Omit<Gallery, "id">>
    ): Promise<Gallery> {
        const rowData = {
            ...(data.title !== undefined && { title: data.title }),
            ...(data.description !== undefined && {
                description: data.description,
            }),
            ...(data.image !== undefined && { image: data.image }),
            ...(data.images !== undefined && { images: data.images }),
            ...(data.professionalId !== undefined && {
                professional_id: data.professionalId,
            }),
            ...(data.active !== undefined && { active: data.active }),
        };

        const { data: updated, error } = await supabase
            .from(this.table)
            .update(rowData)
            .eq("id", id)
            .select()
            .single();

        this.handleError(error);

        return mapRowToGallery(updated as GalleryRow);
    }
}

export const galleryService = new GalleryService();