import type { ReactNode } from "react";

import { cn } from "../../lib/cn";

// Desainnya ada di: src/styles/badge.css
interface BadgeProps {
    /** "dark" untuk latar hijau gelap (hero), "light" untuk latar terang. */
    variant?: "dark" | "light";
    icon?: ReactNode;
    className?: string;
    children: ReactNode;
}

export default function Badge({ variant = "light", icon, className, children }: BadgeProps) {
    return (
        <span className={cn("badge", `badge-${variant}`, className)}>
            {icon}
            {children}
        </span>
    );
};