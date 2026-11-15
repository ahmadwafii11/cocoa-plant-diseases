import { AlertTriangle, Bug, Leaf, type LucideIcon } from "lucide-react";

/**
 * Pengaturan unggah gambar untuk deteksi.
 * Batas ukuran harus sesuai dengan backend:
 * - backend/src/routes/detection.rs            MAX_IMAGE_SIZE
 * - backend/src/main.rs                        DefaultBodyLimit pada /api/detection main.rs (12MB)
 * - ml-service/app/routes/prediction.py        MAX_IMAGE_BYTES
 */
export const DETECTION_MAX_IMAGE_MB = 10;
export const DETECTION_MAX_IMAGE_BYTES = DETECTION_MAX_IMAGE_MB * 1024 * 1024;

// Tipe file yang diterima (model dilatih dengan JPEG)
export const DETECTION_ALLOWED_TYPES = ["image/jpeg"];

// Nilai atribut `accept` pada <input type="file">
export const DETECTION_ACCEPT = ".jpg,.jpeg,image/jpeg";

export interface DiseaseClass {
    name: string;
    category: "Sehat" | "Penyakit" | "Hama";
    icon: LucideIcon;
}

// Empat kelas yang dikenali oleh model (sesuai urutan saat pelatihan model)
export const DISEASE_CLASSES: DiseaseClass[] = [
    { name: "Kakao Sehat", category: "Sehat", icon: Leaf },
    { name: "Busuk Buah", category: "Penyakit", icon: AlertTriangle },
    { name: "Helopeltis", category: "Hama", icon: Bug },
    { name: "Penggerek Buah Kakao (PBK)", category: "Hama", icon: Bug },
];

// Tips agar foto mendapatkan hasil deteksi yang baik
export const PHOTO_TIPS: string[] = [
    "Pastikan buah terlihat dengan jelas dan tidak buram.",
    "Gunakan cahaya yang cukup, serta hindari bayangan hitam tebal yang menutupi permukaan buah kakao.",
    "Fokuskan foto pada bagian permukaan buah kakao yang diduga mengalami suatu masalah.",
];