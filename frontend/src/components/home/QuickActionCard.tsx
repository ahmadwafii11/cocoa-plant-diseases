import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

// Desainnya memakai .feature-card (landing.css) + .action-card (home.css)
interface QuickActionCardProps {
    to: string;
    icon: LucideIcon;
    title: string;
    description: string;
    /** Teks ajakan di bawah kartu, mis. "Mulai deteksi". */
    cta: string;
}

/** Kartu menu yang bisa diklik untuk pindah ke halaman lain. */
export default function QuickActionCard({
    to,
    icon: Icon,
    title,
    description,
    cta,
}: QuickActionCardProps) {
    return (
        <Link to={to} className="feature-card action-card">
            <div className="feature-card-icon">
                <Icon className="icon-lg" aria-hidden="true" />
            </div>

            <h3 className="feature-card-title">{title}</h3>

            <p className="feature-card-desc">{description}</p>

            <span className="action-card-more">
                {cta}
                <ArrowRight className="icon-sm action-card-arrow" aria-hidden="true" />
            </span>
        </Link>
    );
}