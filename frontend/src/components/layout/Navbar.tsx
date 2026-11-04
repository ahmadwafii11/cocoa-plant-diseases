import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";

import type { NavItem } from "../../constants/site";
import { cn } from "../../lib/cn";
import Button from "../ui/Button";
import Logo from "./Logo";

// Desainnya ada di: src/styles/layout.css (bagian NAVBAR)
interface NavbarProps {
    /**
     * Link navigasi di samping logo (tampil mulai ukuran md).
     * href diawali "#"  -> tautan anchor di halaman yang sama (mis. "#fitur")
     * href diawali "/"  -> pindah halaman (mis. "/beranda"), dengan penanda halaman aktif
     */
    links?: NavItem[];
    /** Ganti tombol aksi di kanan, mis. <UserActions /> setelah login. */
    actions?: ReactNode;
    /** Tujuan klik logo. Default "/" (Landing). */
    homeTo?: string;
}

export default function Navbar({ links = [], actions, homeTo = "/" }: NavbarProps) {
    return (
        <header className="navbar">
            <div className="container-wide navbar-inner">
                {/* KIRI: logo + menu berdampingan */}
                <div className="navbar-left">
                    <Logo to={homeTo} />

                    {links.length > 0 && (
                        <nav aria-label="Navigasi utama" className="navbar-links">
                            {links.map((link) =>
                                link.href.startsWith("#") ? (
                                    <a
                                        key={link.href}
                                        href={link.href}
                                        className="navbar-link"
                                    >
                                        {link.label}
                                    </a>
                                ) : (
                                    <NavLink
                                        key={link.href}
                                        to={link.href}
                                        className={({ isActive }) =>
                                            cn(
                                                "navbar-link",
                                                isActive && "navbar-link-active"
                                            )
                                        }
                                    >
                                        {link.label}
                                    </NavLink>
                                )
                            )}
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