/**
 * Konstanta global aplikasi.
 * Ubah di sini agar nama aplikasi, tagline, dan info model
 * konsisten di seluruh halaman.
 */
export const APP_NAME = "CocoaScan";
export const APP_TAGLINE = "Smart Cocoa Disease Detection";
export const MODEL_NAME = "ResNet50-CBAM";
export const CLASS_COUNT = 4;

export const GITHUB_URL = "https://github.com/ahmadwafii11/cocoa-plant-diseases";

export interface NavItem {
    label: string;
    href: string;
};

export const ROUTES = {
    // PUBLIC ROUTES
    landing: "/",
    login: "/login",
    register: "/register",
    terms: "/syarat-ketentuan",

    // PROTECTED ROUTES
    home: "/beranda",
    detect: "/deteksi-penyakit",
    history: "/riwayat-deteksi",
    result: "/hasil-deteksi/:id",
    disease: "/tentang-penyakit",
    profile: "/profil",
} as const;

// Menu navigasi di navbar untuk pengguna yang sudah login
export const APP_NAV_LINKS: NavItem[] = [
    {label: "Beranda", href: ROUTES.home},
    {label: "Deteksi", href: ROUTES.detect},
    {label: "Riwayat", href: ROUTES.history},
    {label: "Tentang Penyakit", href: ROUTES.disease},
];