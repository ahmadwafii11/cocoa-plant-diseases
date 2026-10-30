import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import iconWeb from "../../assets/icon.png";
import { APP_NAME, APP_TAGLINE } from "../../constants/site";

// Desainnya ada di: src/styles/auth.css (bagian 1. KERANGKA & 2. KARTU)
interface AuthCardProps {
    /** Judul besar di atas kartu, mis. "Selamat Datang di CocoaScan". */
    heading: string;
    /** Judul di dalam kartu, mis. "Login". */
    title: string;
    subtitle: string;
    /** Isi kartu (alert + form). */
    children: ReactNode;
    /** Teks di bawah kartu, mis. "Belum punya akun? Daftar sekarang". */
    footer?: ReactNode;
}

/**
 * Kerangka halaman autentikasi (Login, Register, dan nanti Lupa Password):
 * latar gradasi + logo + kartu kaca.
 */

export default function AuthCard({ heading, title, subtitle, children, footer }: AuthCardProps) {
    return (
        <main className="page auth-page">
            <div className="auth-wrap">
                <Link to="/" className="auth-back">
                    <ArrowLeft className="icon-sm" aria-hidden="true" />
                    Kembali ke beranda
                </Link>

                <header className="auth-header">
                    <div className="auth-logo-box">
                        <img
                            src={iconWeb}
                            alt={`Logo ${APP_NAME}`}
                            className="auth-logo"
                        />
                    </div>

                    <h1 className="auth-title">{heading}</h1>
                    <p className="auth-tagline">{APP_TAGLINE}</p>
                </header>

                <div className="auth-card">
                    <div className="auth-card-head">
                        <h2 className="auth-card-title">{title}</h2>
                        <p className="auth-card-subtitle">{subtitle}</p>
                    </div>

                    {children}
                </div>

                {footer && <p className="auth-switch">{footer}</p>}
            </div>
        </main>
    );
};