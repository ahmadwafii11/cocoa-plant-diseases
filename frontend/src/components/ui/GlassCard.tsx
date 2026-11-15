import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

import { cn } from "../../lib/cn";

// Desain terdapat di src/styles/card.css
interface GlassCardProps {
    icon: LucideIcon;
    title: string;
    description?: string;
    className?: string;
    children: ReactNode;
}

export default function GlassCard({
    icon: Icon,
    title,
    description,
    className,
    children,
}: GlassCardProps) {
    return(
        <>
            <section className={cn("glass-card", className)}>
                <header className="glass-card-head">
                    <span className="glass-card-icon">
                        <Icon className="icon-md" aria-hidden="true" />
                    </span>

                    <div>
                        <h2 className="glass-card-title">{title}</h2>
                        {description && <p className="glass-card-desc">{description}</p>}
                    </div>
                </header>
                {children}
            </section>
        </>
    );
}