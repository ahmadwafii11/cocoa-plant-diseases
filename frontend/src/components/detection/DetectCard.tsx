import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

// Desainnya terdapat di src/styles/detection.css (bagian 2. KARTU)
interface DetectCardProps {
    icon: LucideIcon;
    title: string;
    description: string;
    children: ReactNode;
}

// Kartu kaca dengan kepala (ikon + judul + keterangan) dan isi bebas.
export default function DetectCard({ icon: Icon, title, description, children }: DetectCardProps) {
    return (
        <section className="detect-card">
            <header className="detect-card-head">
                <span className="detect-card-icon">
                    <Icon className="icon-md" aria-hidden="true" />
                </span>

                <div>
                    <h2 className="detect-card-title">{title}</h2>
                    <p className="detect-card-desc">{description}</p>
                </div>
            </header>

            {children}
        </section>
    );
}