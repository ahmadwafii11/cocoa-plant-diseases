import type { ReactNode } from "react";

import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
import type { NavItem } from "../constants/site";

interface PublicLayoutProps {
    navLinks?: NavItem[];
    navActions?: ReactNode;
    children: ReactNode;
}

/**
 * Kerangka halaman publik: Navbar + konten + Footer.
 * Dipakai oleh Landing, dan bisa dipakai ulang oleh halaman lain
 * (mis. Login, Register, Daftar Penyakit).
 */

export default function PublicLayout({ navLinks, navActions, children }: PublicLayoutProps) {
    return (
        <div className="flex min-h-screen flex-col bg-gradient-to-br from-green-950 via-green-900 to-green-800">
            <Navbar links={navLinks} actions={navActions} />

            <main className="flex-1">{children}</main>

            <Footer />
        </div>
    );
};