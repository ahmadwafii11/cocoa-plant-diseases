import type { ReactNode } from "react";

import type { NavItem } from "../../constants/site";
import Button from "../ui/Button";
import Logo from "./Logo";

// Desainnya ada di: src/styles/layout.css (bagian NAVBAR)
interface NavbarProps {
    /** Link navigasi di tengah (tampil mulai ukuran md). */
    links?: NavItem[];
    /** Ganti tombol aksi di kanan, misalnya menu user setelah login. */
    actions?: ReactNode;
}

export default function Navbar({ links = [], actions }: NavbarProps) {
    return (
        <header className="navbar">
            <div className="container-wide navbar-inner">
                {/* KIRI: logo + menu berdampingan */}
                <div className="navbar-left">
                    <Logo />

                    {links.length > 0 && (
                        <nav aria-label="Navigasi utama" className="navbar-links">
                            {links.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    className="navbar-link"
                                >
                                    {link.label}
                                </a>
                            ))}
                        </nav>
                    )}
                </div>

                {/* KANAN: tombol aksi */}

                <div className="navbar-actions">
                    {actions ?? (
                        <>
                            <Button to="/login" variant="ghost" size="sm">
                                Login
                            </Button>

                            <Button to="/register" size="sm">
                                Daftar
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};