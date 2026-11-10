import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

// Desainnya ada di: src/styles/profile.css (bagian 2. KARTU)
interface ProfileCardProps {
    icon: LucideIcon;
    title: string;
    description: string;
    children: ReactNode;
}

/** Kartu kaca dengan kepala (ikon + judul + keterangan) dan isi bebas. */
export default function ProfileCard({ icon: Icon, title, description, children }: ProfileCardProps) {
    return (
        <section className="profile-card">
            <header className="profile-card-head">
                <span className="profile-card-icon">
                    <Icon className="icon-md" aria-hidden="true" />
                </span>

                <div>
                    <h2 className="profile-card-title">{title}</h2>
                    <p className="profile-card-desc">{description}</p>
                </div>
            </header>

            {children}
        </section>
    );
}