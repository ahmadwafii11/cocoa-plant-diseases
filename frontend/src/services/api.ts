// Klien HTTP dasar untuk semua pemanggilan ke backend (Rust).

// Semua Service (authService, detetctionService dll.) menggunakan apiRequest()
// di sini, jadi urusan base URL, token, dan penanganan galat ada di satu tempat.

// Alamat server backend (TANPA "/api"). Digunakan untuk file statis seperti gambar.
export const SERVER_BASE_URL: string = 
    import.meta.env.VITE_SERVER_URL ?? "http://127.0.0.1:3000";

// Alamat API (DENGAN "/api"). Digunakan untuk semua pemanggilan endpoint.
export const API_BASE_URL : string = `${SERVER_BASE_URL}/api`;

const TOKEN_KEY = "cocoascan_token";

// ---------------------------------------------------------------------
// Penyimpanan token (localStorage, dibungkus try/catch karena bisa gagal
// di mode privat atau saat penyimpanan diblokir).
// ---------------------------------------------------------------------
export const tokenStorage = {
    get(): string | null {
        try {
            return localStorage.getItem(TOKEN_KEY);
        } catch {
            return null;
        }
    },
    set(token: string): void {
        try {
            localStorage.setItem(TOKEN_KEY, token);
        } catch {
            // diabaikan
        }
    },
    clear(): void {
        try {
            localStorage.removeItem(TOKEN_KEY);
        } catch {
            // diabaikan
        }
    },
};

// ---------------------------------------------------------------------
// Galat dari API
// ---------------------------------------------------------------------
export class ApiError extends Error {
    status: number;
    
    constructor(message: string, status: number) {
        super(message);
        this.name = "ApiError";
        this.status = status;
    }
}

// ---------------------------------------------------------------------
// Handler 401: dipanggil bila token ditolak server (kedaluwarsa / tidak sah).
// AuthContext mendaftarkan fungsi logout di sini.
// ---------------------------------------------------------------------
let unauthorizedHandler: (() => void) | null = null;

export function setUnauthorizedHandler(handler: (() => void) | null): void {
    unauthorizedHandler = handler;
}

// ---------------------------------------------------------------------
// apiRequest
// ---------------------------------------------------------------------
interface RequestOptions extends Omit<RequestInit, "body"> {
    /** Objek biasa akan dikirim sebagai JSON; FormData dikirim apa adanya. */
    body?: unknown;
    /** Sertakan token di header Authorization. Default: true. */
    auth?: boolean;
}

interface ErrorBody {
    message?: string;
}

function defaultMessage(status: number): string {
    switch (status) {
        case 400:
            return "Data yang dikirim tidak valid.";
        case 401:
            return "Sesi tidak valid. Silakan login kembali.";
        case 403:
            return "Anda tidak memiliki akses.";
        case 404:
            return "Data tidak ditemukan.";
        case 409:
            return "Data sudah digunakan.";
        case 413:
            return "Ukuran file terlalu besar.";
        case 415:
            return "Format file tidak didukung.";
        default:
            return status >= 500
                ? "Terjadi kesalahan pada server. Silakan coba lagi."
                : "Permintaan gagal. Silakan coba lagi.";
    }
}

export async function apiRequest<T>(
    path: string,
    { body, auth = true, headers, ...init }: RequestOptions = {}
): Promise<T> {
    const requestHeaders = new Headers(headers);
    let requestBody: BodyInit | undefined;

    if (body instanceof FormData) {
        // Browser mengatur Content-Type (beserta boundary) sendiri.
        requestBody = body;
    } else if (body !== undefined) {
        requestHeaders.set("Content-Type", "application/json");
        requestBody = JSON.stringify(body);
    }

    if (auth) {
        const token = tokenStorage.get();

        if (token) {
            requestHeaders.set("Authorization", `Bearer ${token}`);
        }
    }

    let response: Response;

    try {
        response = await fetch(`${API_BASE_URL}${path}`, {
            ...init,
            headers: requestHeaders,
            body: requestBody,
        });
    } catch {
        throw new ApiError(
            "Tidak dapat terhubung ke server. Periksa koneksi Anda atau coba lagi nanti.",
            0
        );
    }

    if (response.status === 204) {
        return undefined as T;
    }

    const data: unknown = await response.json().catch(() => null);

    if (!response.ok) {
        if (response.status === 401 && auth) {
            unauthorizedHandler?.();
        }

        const message =
            (data as ErrorBody | null)?.message ??
            defaultMessage(response.status);

        throw new ApiError(message, response.status);
    }

    return data as T;
}

/** Mengubah path hasil API (mis. "/uploads/a.jpg") menjadi URL penuh untuk <img src>. */
export function assetUrl(path: string | null): string | null {
    if (!path) {
        return null;
    }

    if (/^https?:\/\//.test(path)) {
        return path;
    }

    // File statis ada di root server, bukan di bawah "/api".
    return `${SERVER_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
