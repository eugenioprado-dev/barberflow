import { supabase } from "../lib/supabase";

class StorageService {
    async upload(file: File, folder: string) {
        const extension = file.name.split(".").pop();

        const fileName =
            `${crypto.randomUUID()}.${extension}`;

        const path = `${folder}/${fileName}`;

        const { error } = await supabase.storage
            .from("uploads")
            .upload(path, file);

        if (error) {
            throw error;
        }

        const { data } = supabase.storage
            .from("uploads")
            .getPublicUrl(path);

        return data.publicUrl;
    }

    async remove(url: string) {
        const index = url.indexOf("/uploads/");

        if (index === -1) {
            return;
        }

        const path = url.substring(index + 9);

        const { error } = await supabase.storage
            .from("uploads")
            .remove([path]);

        if (error) {
            throw error;
        }
    }
}

export const storageService = new StorageService();