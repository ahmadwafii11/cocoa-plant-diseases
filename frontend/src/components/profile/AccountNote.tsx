import { ShieldCheck } from "lucide-react";

import { APP_NAME } from "../../constants/site";

// Desainnya ada di: src/styles/profile.css (bagian 3. KEAMANAN & CATATAN)

/** Catatan singkat di bagian bawah halaman profil. */
export default function AccountNote() {
    return (
        <aside className="profile-note">
            <span className="profile-note-icon">
                <ShieldCheck className="icon-md" aria-hidden="true" />
            </span>

            <div>
                <h2 className="profile-note-title">Tentang Akun {APP_NAME}</h2>
                <p className="profile-note-text">
                    Akun ini digunakan untuk mengakses fitur deteksi penyakit buah
                    kakao dan menyimpan riwayat hasil deteksi pada aplikasi{" "}
                    {APP_NAME}.
                </p>
            </div>
        </aside>
    );
}