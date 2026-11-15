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
    label: string;
    category: "Sehat" | "Penyakit" | "Hama";
    description: string;
    icon: LucideIcon;
}

// Empat kelas yang dikenali oleh model (sesuai urutan saat pelatihan model)
export const DISEASE_CLASSES: DiseaseClass[] = [
    { 
        name: "Kakao Sehat",
        label: "Kakao Sehat",
        category: "Sehat",
        description: "Hasil klasifikasi menunjukkan karakteristik visual yang menyerupai buah kakao sehat.",
        icon: Leaf 
    },
    { 
        name: "Busuk Buah", 
        label: "Busuk Buah",
        category: "Penyakit", 
        description: "Hasil menunjukkan karakteristik yang menyerupai gejala busuk buah pada buah kakao.",
        icon: AlertTriangle 
    },
    { 
        name: "Helopeltis", 
        label: "Helopeltis",
        category: "Hama", 
        description: "Hasil menunjukkan karakteristik yang menyerupai kerusakan akibat serangan Helopeltis.",
        icon: Bug 
    },
    { 
        name: "Penggerek Buah Kakao (PBK)", 
        label: "Penggerek Buah Kakao (PBK)",
        category: "Hama", 
        description: "Hasil menunjukkan karakteristik yang menyerupai gejala serangan Penggerek Buah Kakao (PBK).",
        icon: Bug 
    },
];

// Mencari info kelas dari nama kelas hasil model.
// Undefined apabila kelas tidak dikenal.
export function findDiseaseClass(className: string): DiseaseClass | undefined {
    return DISEASE_CLASSES.find((item) => item.name === className);
}

// Model hanya mempunyai empat kelas (tidak terdapat kelas "bukan kakao")
// Jadi, foto apapun tetap akan diberikan satu label.
// Di bawah ambang ini hasil akan diberikan peringatan.
export const LOW_CONFIDENCE_THRESHOLD = 0.6;

// Tips agar foto mendapatkan hasil deteksi yang baik
export const PHOTO_TIPS: string[] = [
    "Pastikan buah terlihat dengan jelas dan tidak buram.",
    "Gunakan cahaya yang cukup, serta hindari bayangan hitam tebal yang menutupi permukaan buah kakao.",
    "Fokuskan foto pada bagian permukaan buah kakao yang diduga mengalami suatu masalah.",
];