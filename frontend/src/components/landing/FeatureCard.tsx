import type { LucideIcon } from "lucide-react";

// Desainnya ada di: src/styles/landing.css (bagian 3. FEATURES)
interface FeatureCardProps {
    icon: LucideIcon;
    title: string;
    description: string;
}

export default function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
    return (
        <div className="feature-card">
            <div className="feature-card-icon">
                <Icon className="icon-lg" aria-hidden="true" />
            </div>

            <h3 className="feature-card-title">{title}</h3>

            <p className="feature-card-desc">{description}</p>
        </div>
    );
};