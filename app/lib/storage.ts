import { createClient } from "@supabase/supabase-js";

// Menggunakan environment variables yang sudah ada di proyek
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Upload file ke Supabase Storage
 * @param file Objek File dari input HTML
 * @param path Folder tujuan ('requirements' atau 'submissions')
 * @param orderId ID pesanan untuk prefix nama file
 * @returns Public URL dari file yang di-upload
 */
export async function uploadOrderFile(
    file: File,
    path: 'requirements' | 'submissions',
    orderId: string
) {
    try {
        const fileExt = file.name.split('.').pop();
        const fileName = `${orderId}/${path}-${Date.now()}.${fileExt}`;
        const filePath = fileName; // Folder sudah termasuk dalam fileName jika diinginkan, atau dipisah

        const { data, error } = await supabase.storage
            .from('orders')
            .upload(filePath, file, {
                cacheControl: '3600',
                upsert: false
            });

        if (error) {
            throw error;
        }

        const { data: { publicUrl } } = supabase.storage
            .from('orders')
            .getPublicUrl(filePath);

        return publicUrl;
    } catch (error) {
        console.error('Error uploading file:', error);
        throw error;
    }
}

/**
 * Generate Signed URL untuk file privat
 * @param filePath Path file di dalam bucket
 * @param expiresIn Detik masa berlaku URL (default 1 jam)
 */
export async function getSecureFileUrl(filePath: string, expiresIn = 3600) {
    const { data, error } = await supabase.storage
        .from('orders')
        .createSignedUrl(filePath, expiresIn);

    if (error) {
        throw error;
    }

    return data.signedUrl;
}
